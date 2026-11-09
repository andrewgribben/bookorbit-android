@file:OptIn(androidx.compose.ui.ExperimentalComposeUiApi::class)

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
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.ContentCopy
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.autofill.AutofillNode
import androidx.compose.ui.autofill.AutofillType
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.layout.boundsInWindow
import androidx.compose.ui.layout.onGloballyPositioned
import androidx.compose.ui.platform.LocalAutofill
import androidx.compose.ui.platform.LocalAutofillTree
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.browser.customtabs.CustomTabsIntent
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.bookorbit.R
import com.bookorbit.core.model.ReadingServiceAuthMethod

/**
 * One provider's Integrations detail: a built-in (readwise/hardcover, no `authMethods`) shows the
 * existing read-only "manage on the web" link; a private adapter with `authMethods` gets an
 * in-app sign-in flow, or - once connected - account label + Switch account + Disconnect.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProviderDetailScreen(
    provider: String,
    onBack: () -> Unit,
    vm: ProviderDetailViewModel = hiltViewModel(),
) {
    val state by vm.uiState.collectAsStateWithLifecycle()
    val uriHandler = LocalUriHandler.current

    LaunchedEffect(provider) { vm.load(provider) }
    DisposableEffect(provider) { onDispose { vm.onScreenLeft() } }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(state.summary?.resolvedDisplayName ?: provider) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = stringResource(R.string.back))
                    }
                },
            )
        },
    ) { padding ->
        val summary = state.summary
        Box(Modifier.fillMaxSize().padding(padding)) {
            when {
                state.loading -> Box(Modifier.fillMaxSize()) { CircularProgressIndicator(Modifier.padding(32.dp)) }
                summary == null -> Text(
                    stringResource(R.string.integrations_empty),
                    modifier = Modifier.padding(16.dp),
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
                else -> LazyColumn {
                    item {
                        when {
                            !summary.hasInAppSignIn -> ManageOnWebSection(
                                onOpenWebSettings = { runCatching { uriHandler.openUri(vm.webSettingsUrl(provider)) } },
                            )
                            state.connected -> ConnectedSection(state = state, vm = vm)
                            else -> SignInSection(state = state, vm = vm)
                        }
                    }
                    if (state.socialAdapters.isNotEmpty()) {
                        item { HorizontalDivider() }
                        item {
                            Text(
                                stringResource(R.string.integrations_social_section),
                                style = MaterialTheme.typography.titleMedium,
                                modifier = Modifier.padding(16.dp),
                            )
                        }
                        items(state.socialAdapters, key = { it.provider }) { adapter ->
                            SocialAdapterSection(provider = adapter.provider)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun SocialAdapterSection(provider: String, vm: ProviderDetailViewModel = hiltViewModel(key = provider)) {
    val state by vm.uiState.collectAsStateWithLifecycle()

    LaunchedEffect(provider) { vm.load(provider) }
    DisposableEffect(provider) { onDispose { vm.onScreenLeft() } }

    Column(Modifier.padding(horizontal = 16.dp, vertical = 8.dp)) {
        Text(state.summary?.resolvedDisplayName ?: provider, style = MaterialTheme.typography.titleSmall)
        when {
            state.loading -> CircularProgressIndicator(Modifier.padding(16.dp))
            state.connected -> ConnectedSection(state = state, vm = vm)
            else -> SignInSection(state = state, vm = vm)
        }
    }
}

@Composable
private fun ManageOnWebSection(onOpenWebSettings: () -> Unit) {
    Column(Modifier.padding(16.dp)) {
        Text(stringResource(R.string.integrations_manage_on_web), color = MaterialTheme.colorScheme.onSurfaceVariant)
        OutlinedButton(onClick = onOpenWebSettings, modifier = Modifier.padding(top = 16.dp)) {
            Text(stringResource(R.string.settings_integrations_manage))
        }
    }
}

@Composable
private fun ConnectedSection(state: ProviderDetailUiState, vm: ProviderDetailViewModel) {
    Column(Modifier.padding(16.dp)) {
        Text(
            state.connectedAccountLabel?.let { stringResource(R.string.integrations_status_connected_as, it) }
                ?: stringResource(R.string.integrations_status_connected),
            style = MaterialTheme.typography.bodyLarge,
        )
        Row(Modifier.padding(top = 16.dp), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            OutlinedButton(onClick = vm::switchAccount) { Text(stringResource(R.string.integrations_switch_account)) }
            OutlinedButton(onClick = vm::requestDisconnect) { Text(stringResource(R.string.integrations_disconnect)) }
        }
    }

    if (state.confirmDisconnect) {
        AlertDialog(
            onDismissRequest = vm::cancelDisconnectRequest,
            title = { Text(stringResource(R.string.integrations_disconnect_confirm_title)) },
            text = { Text(stringResource(R.string.integrations_disconnect_confirm_body)) },
            confirmButton = {
                TextButton(onClick = vm::confirmDisconnect) { Text(stringResource(R.string.integrations_disconnect)) }
            },
            dismissButton = {
                TextButton(onClick = vm::cancelDisconnectRequest) { Text(stringResource(R.string.integrations_cancel)) }
            },
        )
    }
}

@Composable
private fun SignInSection(state: ProviderDetailUiState, vm: ProviderDetailViewModel) {
    val methods = state.summary?.authMethods.orEmpty()
    val selected = state.selectedMethod ?: methods.firstOrNull()

    Column(Modifier.padding(16.dp)) {
        if (methods.size > 1) {
            Text(stringResource(R.string.integrations_sign_in_method), style = MaterialTheme.typography.labelLarge)
            SingleChoiceSegmentedButtonRow(modifier = Modifier.fillMaxWidth().padding(top = 8.dp, bottom = 16.dp)) {
                methods.forEachIndexed { index, method ->
                    SegmentedButton(
                        selected = selected?.kind == method.kind,
                        onClick = { vm.selectMethod(method) },
                        shape = SegmentedButtonDefaults.itemShape(index, methods.size),
                        label = { Text(method.label.ifBlank { method.kind }) },
                    )
                }
            }
        }

        state.errorMessage?.let {
            Text(it, color = MaterialTheme.colorScheme.error, modifier = Modifier.padding(bottom = 12.dp))
        }

        when (selected?.kind) {
            ReadingServiceAuthMethod.PASSWORD -> PasswordForm(state, selected, vm)
            ReadingServiceAuthMethod.TOKEN -> TokenForm(state, selected, vm)
            ReadingServiceAuthMethod.DEVICE_CODE -> DeviceCodeForm(state, vm)
            else -> Unit
        }
    }
}

@Composable
private fun PasswordForm(state: ProviderDetailUiState, method: ReadingServiceAuthMethod, vm: ProviderDetailViewModel) {
    val usernameLabel = method.fields?.username?.label ?: stringResource(R.string.integrations_username)
    val passwordLabel = method.fields?.password?.label ?: stringResource(R.string.integrations_password)

    OutlinedTextField(
        value = state.username,
        onValueChange = vm::updateUsername,
        label = { Text(usernameLabel) },
        singleLine = true,
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
        modifier = Modifier.fillMaxWidth().autofill(listOf(AutofillType.Username), vm::updateUsername),
    )
    OutlinedTextField(
        value = state.password,
        onValueChange = vm::updatePassword,
        label = { Text(passwordLabel) },
        singleLine = true,
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
        visualTransformation = if (state.passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
        trailingIcon = {
            IconButton(onClick = vm::togglePasswordVisible) {
                Icon(
                    if (state.passwordVisible) Icons.Filled.VisibilityOff else Icons.Filled.Visibility,
                    contentDescription = stringResource(
                        if (state.passwordVisible) R.string.integrations_hide_password else R.string.integrations_show_password,
                    ),
                )
            }
        },
        modifier = Modifier.fillMaxWidth().padding(top = 12.dp).autofill(listOf(AutofillType.Password), vm::updatePassword),
    )
    Button(
        onClick = vm::submitPassword,
        enabled = !state.submitting && state.username.isNotBlank() && state.password.isNotBlank(),
        modifier = Modifier.padding(top = 16.dp),
    ) {
        Text(if (state.submitting) stringResource(R.string.integrations_connecting) else stringResource(R.string.integrations_connect))
    }
}

/**
 * Manual autofill hook (`androidx.compose.ui.autofill`'s experimental pre-`ContentType` API,
 * which is what this app's current Compose BOM exposes publicly - the newer
 * `Modifier.semantics { contentType = ... }` surface is still `internal` at this BOM version).
 * Registers one [AutofillNode] with the position-tracking and focus-triggered request/cancel the
 * framework needs to actually offer a saved value for this field.
 */
@OptIn(androidx.compose.ui.ExperimentalComposeUiApi::class)
@Composable
private fun Modifier.autofill(autofillTypes: List<AutofillType>, onFill: (String) -> Unit): Modifier {
    val autofill = LocalAutofill.current
    val node = remember(autofillTypes) { AutofillNode(autofillTypes = autofillTypes, onFill = onFill) }
    LocalAutofillTree.current += node
    return this
        .onGloballyPositioned { node.boundingBox = it.boundsInWindow() }
        .onFocusChanged { focusState ->
            autofill?.let {
                if (focusState.isFocused) it.requestAutofillForNode(node) else it.cancelAutofillForNode(node)
            }
        }
}

@Composable
private fun TokenForm(state: ProviderDetailUiState, method: ReadingServiceAuthMethod, vm: ProviderDetailViewModel) {
    OutlinedTextField(
        value = state.token,
        onValueChange = vm::updateToken,
        label = { Text(stringResource(R.string.integrations_token)) },
        placeholder = method.placeholder?.let { { Text(it) } },
        singleLine = true,
        visualTransformation = if (state.tokenVisible) VisualTransformation.None else PasswordVisualTransformation(),
        trailingIcon = {
            IconButton(onClick = vm::toggleTokenVisible) {
                Icon(
                    if (state.tokenVisible) Icons.Filled.VisibilityOff else Icons.Filled.Visibility,
                    contentDescription = stringResource(
                        if (state.tokenVisible) R.string.integrations_hide_token else R.string.integrations_show_token,
                    ),
                )
            }
        },
        modifier = Modifier.fillMaxWidth(),
    )
    Button(
        onClick = vm::submitToken,
        enabled = !state.submitting && state.token.isNotBlank(),
        modifier = Modifier.padding(top = 16.dp),
    ) {
        Text(if (state.submitting) stringResource(R.string.integrations_connecting) else stringResource(R.string.integrations_connect))
    }
}

@Composable
private fun DeviceCodeForm(state: ProviderDetailUiState, vm: ProviderDetailViewModel) {
    val context = LocalContext.current
    val clipboard = LocalClipboardManager.current
    val deviceAuth = state.deviceAuth

    if (deviceAuth == null) {
        Button(onClick = vm::startDeviceAuth, enabled = !state.submitting) {
            Text(stringResource(R.string.integrations_device_code_start))
        }
        return
    }

    Column {
        if (deviceAuth.userCode != null) {
            SelectionContainer {
                Text(
                    deviceAuth.userCode,
                    style = MaterialTheme.typography.displaySmall,
                    modifier = Modifier.padding(bottom = 8.dp),
                )
            }
            Row {
                IconButton(onClick = { clipboard.setText(AnnotatedString(deviceAuth.userCode)) }) {
                    Icon(Icons.Filled.ContentCopy, contentDescription = stringResource(R.string.integrations_device_code_copy))
                }
            }
        }
        OutlinedButton(
            onClick = { runCatching { CustomTabsIntent.Builder().build().launchUrl(context, android.net.Uri.parse(deviceAuth.verificationUrl)) } },
            modifier = Modifier.padding(top = 8.dp),
        ) {
            Text(stringResource(R.string.integrations_device_code_open_link))
        }

        Text(
            when (state.devicePollState) {
                DevicePollState.WAITING -> stringResource(R.string.integrations_device_code_waiting)
                DevicePollState.APPROVED -> stringResource(R.string.integrations_device_code_approved)
                DevicePollState.EXPIRED -> stringResource(R.string.integrations_device_code_expired)
                DevicePollState.DENIED -> stringResource(R.string.integrations_device_code_denied)
                DevicePollState.ERROR -> stringResource(R.string.integrations_device_code_error)
                DevicePollState.IDLE -> ""
            },
            modifier = Modifier.padding(top = 16.dp),
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )

        if (state.devicePollState in setOf(DevicePollState.EXPIRED, DevicePollState.DENIED, DevicePollState.ERROR)) {
            OutlinedButton(onClick = vm::startDeviceAuth, modifier = Modifier.padding(top = 8.dp)) {
                Text(stringResource(R.string.integrations_try_again))
            }
        }
    }
}
