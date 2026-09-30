"use client"

import React, { useMemo } from "react"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { ListNode, ListItemNode } from "@lexical/list"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { $getRoot, $insertNodes, EditorState, LexicalEditor } from "lexical"
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html"
import ToolbarPlugin from "./ToolbarPlugin"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"



interface PropInterface {
    label?: string
    name: string
    value: string // HTML string
    placeholder: string
    onChange: (e: { target: { name: string; value: string } }) => void
    error?: string
}

export default function RichTextEditor({
    label,
    name,
    value,
    placeholder,
    onChange,
    error = ""
}: PropInterface) {
    const initialConfig = useMemo(
        () => ({
            namespace: "RichTextEditor",
            theme: {
                paragraph: "mb-2",
                heading: {
                    h1: "text-4xl font-bold mb-2",
                    h2: "text-2xl font-bold mb-2",
                    h3: "text-xl font-bold mb-2"
                },
                list: {
                    ul: "list-disc ml-4 mb-2",
                    ol: "list-decimal ml-4 mb-2",
                    listitem: "mb-1"
                },
                text: {
                    bold: "font-bold",
                    underline: "underline",
                    italic: "italic"
                }
            },
            nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
            onError: (error: Error) => {
                console.error(error)
            },
            // Load the incoming HTML string (if any) as the editor's starting content.
            // This function runs once, inside an editor.update(), when the composer mounts.
            editorState: (editor: LexicalEditor) => {
                if (!value) return
                const parser = new DOMParser()
                const dom = parser.parseFromString(value, "text/html")
                const nodes = $generateNodesFromDOM(editor, dom)
                const root = $getRoot()
                root.clear()
                $insertNodes(nodes)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }),
        [] // only build the initial state once — Lexical ignores config changes after mount
    )

    return (
        <div className="mb-4">
            {label && (
                <p className="font-medium text-sm text-gray-700 mb-1">{label}:</p>
            )}
            <LexicalComposer initialConfig={initialConfig}>
                <div className="w-full rounded-lg border border-gray-300 focus-within:border-gray-500 ease-initial duration-200 transition-all overflow-hidden">
                    <ToolbarPlugin />
                    <div className="relative min-h-30 p-3">
                        <RichTextPlugin
                            contentEditable={
                                <ContentEditable className="outline-none min-h-30 text-gray-800" />
                            }
                            placeholder={
                                <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
                                    {placeholder}
                                </div>
                            }
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <HistoryPlugin />
                        <ListPlugin />
                        <OnChangePlugin
                            onChange={(editorState: EditorState, editor: LexicalEditor) => {
                                editorState.read(() => {
                                    const htmlString = $generateHtmlFromNodes(editor, null)
                                    onChange({
                                        target: {
                                            name,
                                            value: htmlString
                                        }
                                    })
                                })
                            }}
                        />
                    </div>
                </div>
            </LexicalComposer>
            {error && (
                <p className="text-xs text-red-600 font-light mt-1">{error}</p>
            )}
        </div>
    )
}