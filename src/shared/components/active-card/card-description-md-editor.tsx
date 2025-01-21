import EditNoteIcon from '@mui/icons-material/EditNote';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useColorScheme } from '@mui/material/styles';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';

const markdownValueExample = `
  *\`Markdown Content Example:\`*

  **Hello world | Ronaldo siuuu | Trello MERN Stack**
  [![](https://res.cloudinary.com/dat2lyvva/image/upload/v1737353229/trello-mern/users/lndtpoddwjnb9wodfgc9.jpg)](https://res.cloudinary.com/dat2lyvva/image/upload/v1737353229/trello-mern/users/lndtpoddwjnb9wodfgc9.jpg)
  \`\`\`typescript
  import React from "react";
  import ReactDOM from "react-dom";
  import MDEditor from '@uiw/react-md-editor';
  \`\`\`
`;
// https://codesandbox.io/embed/markdown-editor-for-react-izdd6?fontsize=14&hidenavigation=1&theme=dark
function CardDescriptionMdEditor() {
    const { mode } = useColorScheme();

    const [markdownEditMode, setMarkdownEditMode] = useState(false);
    const [cardDescription, setCardDescription] = useState(markdownValueExample);

    const updateCardDescription = () => {
        setMarkdownEditMode(false);
        console.log('🚀 ~ updateCardDescription ~ cardDescription:', cardDescription);
    };

    return (
        <Box sx={{ mt: -4 }}>
            {markdownEditMode ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 5 }}>
                    <Box data-color-mode={mode}>
                        <MDEditor
                            height={400}
                            preview='edit'
                            // https://www.npmjs.com/package/@uiw/react-md-editor#security
                            previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
                            value={cardDescription}
                            // hideToolbar={true}
                            onChange={(value) => setCardDescription(value!)}
                        />
                    </Box>
                    <Button
                        type='button'
                        variant='contained'
                        size='small'
                        color='info'
                        className='interceptor-loading'
                        sx={{ alignSelf: 'flex-end' }}
                        onClick={updateCardDescription}
                    >
                        Save
                    </Button>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                        type='button'
                        variant='contained'
                        color='info'
                        size='small'
                        startIcon={<EditNoteIcon />}
                        sx={{ alignSelf: 'flex-end' }}
                        onClick={() => setMarkdownEditMode(true)}
                    >
                        Edit
                    </Button>
                    <Box data-color-mode={mode}>
                        <MDEditor.Markdown
                            source={cardDescription}
                            style={{
                                padding: cardDescription ? '10px' : '0px',
                                border: cardDescription ? '0.5px solid rgba(0, 0, 0, 0.2)' : 'none',
                                borderRadius: '8px',
                                whiteSpace: 'pre-wrap',
                            }}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default CardDescriptionMdEditor;
