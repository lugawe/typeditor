// typstMonarch.js
export const typstMonarch = {
    defaultToken: '',
    tokenPostfix: '.typst',

    keywords: [
        'let', 'set', 'show', 'context', 'as', 'in', 'def',
        'if', 'else', 'for', 'while', 'import', 'include', 'export', 'return', 'break', 'continue'
    ],

    brackets: [
        { open: '{', close: '}', token: 'delimiter.bracket' },
        { open: '[', close: ']', token: 'delimiter.array' },
        { open: '(', close: ')', token: 'delimiter.parenthesis' },
    ],

    tokenizer: {
        root: [
            // comments
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],

            // headings
            [/^=+\s.*$/, 'keyword'],

            // raw blocks & inline raw
            [/`{3,}/, 'string.raw', '@rawblock'],
            [/`[^`]*`/, 'string.raw'],

            // inline math
            [/\$[^$]*\$/, 'string.math'],

            // unicode escapes
            [/\\u\{[0-9A-Za-z]+\}/, 'constant.escape'],
            // single-char escapes
            [/\\[\\\/\[\]{}#*_=~`$\.\-]/, 'constant.escape'],

            // lists
            [/^\s*-\s+/, 'keyword.list.unordered'],
            [/^\s*\d+(?:\.|\+)\s+/, 'keyword.list.ordered'],

            // labels & references
            [/<[A-Za-z_]\w*>/, 'entity.name.label'],
            [/@[A-Za-z_]\w*/, 'entity.other.reference'],

            // constants & numbers
            [/\b(?:true|false|none|auto)\b/, 'constant.language'],
            [/\b\d+(\.\d+)?(?:mm|cm|in|pt|fr|rad|deg|%)\b/, 'constant.numeric'],

            // #keywords
            [/#\s*(?:let|set|show|context|as|in)\b/, 'keyword'],
            [/#\s*(?:if|else|for|while|import|include|export|return|break|continue)\b/, 'keyword.control'],
            // function names
            [/(?:#\w+!?)(?=\[|\()/, 'entity.name.function'],

            // identifiers & operators
            [/[A-Za-z_]\w*/, {
                cases: {
                    '@keywords': 'keyword',
                    '@default': 'identifier'
                }
            }],
            [/[{}()\[\]]/, '@brackets'],
            [/[=+\-*/%^!<>]+/, 'operator'],

            // inline markup
            [/\*\*(?=\S)(?:[^\r]*?\S)\*\*/, 'markup.bold'],
            [/\*(?=\S)(?:[^\r]*?\S)\*/, 'markup.italic'],
            [/_(?=\S)(?:[^\r]*?\S)_/, 'markup.underline'],

            // whitespace
            [/[ \t\r\n]+/, 'white'],
        ],

        comment: [
            [/[^\/*]+/, 'comment'],
            [/\/\*/, 'comment', '@push'],
            ['\\*/', 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],

        rawblock: [
            [/.*?`{3,}/, 'string.raw', '@pop'],
            [/.*$/, 'string.raw']
        ]
    }
}
