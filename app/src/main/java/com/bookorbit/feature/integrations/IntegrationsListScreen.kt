package com.bookorbit.feature.integrations

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import coil.compose.AsyncImage
import com.bookorbit.R
import com.bookorbit.core.model.ReadingServiceSummary
import com.bookorbit.core.model.groupReadingServiceSummaries
import com.bookorbit.core.network.ReadingServicesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import javax.inject.Inject

@HiltViewModel
class IntegrationsListViewModel @Inject constructor(
    private val repository: ReadingServicesRepository,
) : ViewModel() {
    private val _summaries = MutableStateFlow<List<ReadingServiceSummary>>(emptyList())
    val summaries: StateFlow<List<ReadingServiceSummary>> = _summaries.asStateFlow()

    private val _loading = MutableStateFlow(true)
    val loading: StateFlow<Boolean> = _loading.asStateFlow()

    init {
        refresh()
    }

    fun refresh() {
        viewModelScope.launch {
            _loading.value = true
            val (topLevel, _) = groupReadingServiceSummaries(repository.summaries())
            _summaries.value = topLevel
            _loading.value = false
        }
    }
}

/** An `iconUrl` this app can safely hand to Coil. SVG data URLs have no decoder registered, so
 * those (and anything else unexpected) fall back to name-only rendering instead of crashing. */
private fun ReadingServiceSummary.safeIconUrl(): String? {
    val url = iconUrl ?: return null
    if (url.startsWith("http://") || url.startsWith("https://")) return url
    if (url.startsWith("data:image/svg")) return null
    if (url.startsWith("data:image/")) return url
    return null
}

@Composable
private fun ReadingServiceSummary.statusText(): String = when {
    needsReconnect -> stringResource(R.string.integrations_status_needs_reconnect)
    connected -> stringResource(R.string.integrations_status_connected)
    else -> stringResource(R.string.integrations_status_not_connected)
}

/** `Settings > Integrations`: every provider from `GET /reading-services` (built-in and private
 * adapters alike), by display name, with its connection status. Tapping opens [ProviderDetailScreen]. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun IntegrationsListScreen(
    onBack: () -> Unit,
    onProviderClick: (String) -> Unit,
    vm: IntegrationsListViewModel = hiltViewModel(),
) {
    val summaries by vm.summaries.collectAsStateWithLifecycle()
    val loading by vm.loading.collectAsStateWithLifecycle()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.integrations_title)) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = stringResource(R.string.back))
                    }
                },
            )
        },
    ) { padding ->
        when {
            loading -> Box(Modifier.fillMaxSize().padding(padding), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
            summaries.isEmpty() -> Box(Modifier.fillMaxSize().padding(padding), contentAlignment = Alignment.Center) {
                Text(stringResource(R.string.integrations_empty), color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            else -> LazyColumn(modifier = Modifier.fillMaxWidth().padding(padding)) {
                items(summaries, key = { it.provider }) { summary ->
                    IntegrationRow(summary = summary, onClick = { onProviderClick(summary.provider) })
                    HorizontalDivider()
                }
            }
        }
    }
}

@Composable
private fun IntegrationRow(summary: ReadingServiceSummary, onClick: () -> Unit) {
    val iconUrl = remember(summary) { summary.safeIconUrl() }
    ListItem(
        modifier = Modifier.clickable(onClick = onClick),
        leadingContent = {
            if (iconUrl != null) {
                AsyncImage(model = iconUrl, contentDescription = null, modifier = Modifier.size(32.dp))
            }
        },
        headlineContent = { Text(summary.resolvedDisplayName) },
        supportingContent = { Text(summary.statusText()) },
    )
}
