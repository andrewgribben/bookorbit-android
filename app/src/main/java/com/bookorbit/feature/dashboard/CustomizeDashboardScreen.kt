package com.bookorbit.feature.dashboard

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.ArrowDownward
import androidx.compose.material.icons.filled.ArrowUpward
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.bookorbit.R
import androidx.compose.ui.res.stringResource
import com.bookorbit.core.model.ShelfConfigEntry
import com.bookorbit.core.model.knownShelfLabelRes

/**
 * Settings > Appearance > Customize Dashboard: every shelf the signed-in user's server knows
 * about (built-in or server-defined, e.g. smart-scope shelves), toggle-able and reorderable.
 * Shelves aren't created or deleted here - only enabled/disabled and moved.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CustomizeDashboardScreen(onBack: () -> Unit, vm: CustomizeDashboardViewModel = hiltViewModel()) {
    val ui by vm.ui.collectAsStateWithLifecycle()
    val message by vm.message.collectAsStateWithLifecycle()
    val snackbarHostState = remember { SnackbarHostState() }
    val context = LocalContext.current

    LaunchedEffect(message) {
        message?.let {
            snackbarHostState.showSnackbar(it.resolve(context))
            vm.consumeMessage()
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.dashboard_customize_title)) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = stringResource(R.string.back))
                    }
                },
            )
        },
        snackbarHost = { SnackbarHost(snackbarHostState) },
    ) { padding ->
        LazyColumn(modifier = Modifier.fillMaxWidth().padding(padding)) {
            item {
                Text(
                    stringResource(R.string.dashboard_customize_desc),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                )
            }
            itemsIndexed(ui.entries, key = { _, entry -> entry.id }) { index, entry ->
                val label = shelfDisplayLabel(entry)
                val toggleDescription = stringResource(R.string.dashboard_customize_toggle, label)
                ListItem(
                    headlineContent = { Text(label) },
                    trailingContent = {
                        Row {
                            IconButton(
                                onClick = { vm.move(index, -1) },
                                enabled = index > 0,
                                modifier = Modifier.size(48.dp),
                            ) {
                                Icon(Icons.Filled.ArrowUpward, contentDescription = stringResource(R.string.dashboard_customize_move_up, label))
                            }
                            IconButton(
                                onClick = { vm.move(index, 1) },
                                enabled = index < ui.entries.lastIndex,
                                modifier = Modifier.size(48.dp),
                            ) {
                                Icon(Icons.Filled.ArrowDownward, contentDescription = stringResource(R.string.dashboard_customize_move_down, label))
                            }
                            Switch(
                                checked = entry.enabled,
                                onCheckedChange = { vm.toggle(entry.id) },
                                modifier = Modifier.semantics {
                                    contentDescription = toggleDescription
                                },
                            )
                        }
                    },
                )
            }
            item {
                Column(modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)) {
                    OutlinedButton(onClick = vm::resetToDefault) {
                        Text(stringResource(R.string.dashboard_customize_reset))
                    }
                }
            }
        }
    }
}

/** Known types get their localized shelf name; anything else falls back to its stored label, or
 * the raw type string if even that is blank (a shelf with no friendly name at all). */
@Composable
private fun shelfDisplayLabel(entry: ShelfConfigEntry): String {
    val res = knownShelfLabelRes(entry.type)
    return if (res != null) stringResource(res) else entry.label.ifBlank { entry.type }
}
