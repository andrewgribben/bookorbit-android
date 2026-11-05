package com.bookorbit.core.db

import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * Local reading position per server file id: written locally first and kept [dirty] until the
 * server accepts it. [pageNumber] (one-based) is kept for page-based formats (comics) so the
 * server, and the web reader that resumes from it, get the exact page back on a later sync.
 */
@Entity(tableName = "reader_progress")
data class ReaderProgressEntity(
    @PrimaryKey val fileId: Int,
    val cfi: String?,
    val percentage: Double,
    val updatedAt: Long,
    val dirty: Boolean,
    val pageNumber: Int? = null,
    /** Read-aloud EPUBs: first narrated sentence on the page, re-sent with an offline retry. */
    val mediaOverlayFragment: String? = null,
    val mediaOverlaySectionIndex: Int? = null,
)
