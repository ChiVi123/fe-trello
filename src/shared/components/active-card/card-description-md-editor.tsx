import EditNoteIcon from '@mui/icons-material/EditNote';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useColorScheme } from '@mui/material/styles';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';

interface IProps {
    defaultValue?: string;
    onChangeValue?: (value: string) => void;
}

// https://codesandbox.io/embed/markdown-editor-for-react-izdd6?fontsize=14&hidenavigation=1&theme=dark
function CardDescriptionMdEditor({ defaultValue = '', onChangeValue }: IProps) {
    const { mode } = useColorScheme();

    const [markdownEditMode, setMarkdownEditMode] = useState(false);
    const [cardDescription, setCardDescription] = useState(defaultValue);

    const updateCardDescription = () => {
        setMarkdownEditMode(false);
        if (!cardDescription || cardDescription === defaultValue) return;

        onChangeValue?.(cardDescription);
    };

    return (
        <Box sx={{ mt: -4 }}>
            {markdownEditMode ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 5 }}>
                    <Box data-color-mode={mode}>
                        <MDEditor
                            height={280}
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
