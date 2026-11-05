package com.bookorbit.ui.components

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material.icons.filled.ArrowDownward
import androidx.compose.material.icons.filled.ArrowUpward
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.AssistChip
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.compose.ui.focus.FocusManager
import androidx.compose.ui.platform.LocalFocusManager
import com.bookorbit.R
import com.bookorbit.feature.library.filters.LibrarySort
import com.bookorbit.feature.library.filters.defaultSortDirection

/**
 * A text search field shared by every Library-tab section (Books, Series, Authors). IME action is
 * "search" and a clear button appears once there is text, matching [SearchScreen]'s pattern.
 */
@Composable
fun LibrarySearchField(
    query: String,
    onQueryChange: (String) -> Unit,
    placeholder: String,
    modifier: Modifier = Modifier,
    focusManager: FocusManager = LocalFocusManager.current,
) {
    OutlinedTextField(
        value = query,
        onValueChange = onQueryChange,
        modifier = modifier,
        singleLine = true,
        placeholder = { Text(placeholder) },
        leadingIcon = { Icon(Icons.Filled.Search, contentDescription = null) },
        trailingIcon = {
            if (query.isNotEmpty()) {
                IconButton(onClick = { onQueryChange("") }) {
                    Icon(Icons.Filled.Close, contentDescription = stringResource(R.string.clear_search))
                }
            }
        },
        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
        keyboardActions = KeyboardActions(onSearch = { focusManager.clearFocus() }),
    )
}

/**
 * Current-sort chip + direction toggle shared by every Library-tab section. Picking a new field
 * resets direction to [defaultSortDirection] for that field; the arrow button flips direction
 * without changing the field.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SortControl(
    sort: LibrarySort,
    options: List<Pair<String, Int>>,
    onSortChange: (LibrarySort) -> Unit,
    modifier: Modifier = Modifier,
) {
    var expanded by remember { mutableStateOf(false) }
    val currentLabelRes = options.firstOrNull { it.first == sort.field }?.second

    Row(modifier = modifier, verticalAlignment = Alignment.CenterVertically) {
        AssistChip(
            onClick = { expanded = true },
            label = { Text(currentLabelRes?.let { stringResource(it) } ?: sort.field) },
            trailingIcon = { Icon(Icons.Filled.ArrowDropDown, contentDescription = null) },
        )
        DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
            options.forEach { (field, labelRes) ->
                DropdownMenuItem(
                    text = { Text(stringResource(labelRes)) },
                    onClick = {
                        expanded = false
                        if (field != sort.field) onSortChange(LibrarySort(field, defaultSortDirection(field)))
                    },
                )
            }
        }
        IconButton(
            onClick = { onSortChange(sort.copy(dir = if (sort.dir == "asc") "desc" else "asc")) },
            modifier = Modifier.size(48.dp),
        ) {
            Icon(
                if (sort.dir == "asc") Icons.Filled.ArrowUpward else Icons.Filled.ArrowDownward,
                contentDescription = stringResource(R.string.change_sort_direction),
            )
        }
    }
}
