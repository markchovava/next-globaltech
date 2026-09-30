"use client"

import React, { useCallback, useEffect, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
    SELECTION_CHANGE_COMMAND,
    FORMAT_TEXT_COMMAND,
    $getSelection,
    $isRangeSelection
} from "lexical"
import { $setBlocksType } from "@lexical/selection"
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text"
import { INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND } from "@lexical/list"

export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext()
    const [isBold, setIsBold] = useState(false)
    const [isUnderline, setIsUnderline] = useState(false)

    const updateToolbar = useCallback(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat("bold"))
            setIsUnderline(selection.hasFormat("underline"))
        }
    }, [])

    useEffect(() => {
        return editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            () => {
                updateToolbar()
                return false
            },
            1
        )
    }, [editor, updateToolbar])

    const formatHeading = (headingSize: "h1" | "h2" | "h3") => {
        editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode(headingSize))
            }
        })
    }

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 text-sm">
            <button
                type="button"
                onClick={() => formatHeading("h1")}
                className="px-2 py-1 rounded hover:bg-gray-200 font-semibold text-gray-700"
            >
                H1
            </button>
            <button
                type="button"
                onClick={() => formatHeading("h2")}
                className="px-2 py-1 rounded hover:bg-gray-200 font-semibold text-gray-700"
            >
                H2
            </button>
            <button
                type="button"
                onClick={() => formatHeading("h3")}
                className="px-2 py-1 rounded hover:bg-gray-200 font-semibold text-gray-700"
            >
                H3
            </button>
            <span className="w-px h-4 bg-gray-300 mx-1" />
            <button
                type="button"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
                className={`px-2 py-1 rounded font-bold ${isBold ? "bg-gray-300" : "hover:bg-gray-200"}`}
            >
                B
            </button>
            <button
                type="button"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
                className={`px-2 py-1 rounded underline ${isUnderline ? "bg-gray-300" : "hover:bg-gray-200"}`}
            >
                U
            </button>
            <span className="w-px h-4 bg-gray-300 mx-1" />
            <button
                type="button"
                onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
                className="px-2 py-1 rounded hover:bg-gray-200 text-gray-700"
            >
                Bullet List
            </button>
            <button
                type="button"
                onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
                className="px-2 py-1 rounded hover:bg-gray-200 text-gray-700"
            >
                Numbered List
            </button>
        </div>
    )
}