const templates = [
    {
        name: 'empty',
        description: 'Completely empty template. You will need to implement everything yourself.',
        files: [
            {
                name: 'index.ts',
                code: `
                class Plugin {
                    start() {
                
                    }
                
                    stop() {
                
                    }
                }
                
                export default new Plugin();`
            }
        ]
    },
    {
        name: 'basic',
        description: 'Basic template with featuring a Patcher named with the plugin\'s identifier',
        files: [
            {
                name: 'index.ts',
                code: `
                import { createPatcher } from '@unbound/patcher';
                import manifest from '../manifest.json';

                const Patcher = createPatcher(manifest.id);

                class Plugin {
                    start() {

                    }

                    stop() {
                        Patcher.unpatchAll();
                    }
                }

                export default new Plugin();`
            }
        ]
    },
    {
        name: 'full',
        description: 'Fully featured template which includes a Settings panel, example patches, etc.',
        files: [
            {
                name: 'index.tsx',
                code: `
                import { createPatcher } from '@unbound/patcher';
                import { findByProps } from '@unbound/metro';
                import { noop } from '@unbound/utilities';
                
                import manifest from '../manifest.json';
                import Settings from './Settings';
                
                const Patcher = createPatcher(manifest.name);
                
                // It's generally good practice to declare 'lazy' as an option on searches like this
                // However, these are patched instantly, so the lazy primitive is not needed
                const Typing = findByProps('startTyping', 'stopTyping')
                
                class Plugin {
                    start() {
                        Patcher.instead(Typing, 'startTyping', noop);
                        Patcher.instead(Typing, 'stopTyping', noop);
                    }
                
                    stop() {
                        Patcher.unpatchAll();
                    }
                
                    settings() {
                        return <Settings />
                    }
                }
                
                export default new Plugin();`
            },
            {
                name: 'Settings.tsx',
                code: `
                import { Redesign } from '@unbound/metro/components';

                export default () => {
                    const store = settings.useSettingsStore();
                    const taps = store.get('taps', 0);
                
                    return <Redesign.Button
                        onPress={() => store.set('taps', taps + 1)}
                    >
                        {store.get('taps', 0)} taps
                    </Redesign.Button>;
                }`
            }
        ]
    }
].map(template => {
    const parsedFiles = template.files.map(file => {
        const codeInLines = file.code
            .split('\n');

        // Get rid of the empty first newline
        codeInLines.shift();

        const parsedCode = codeInLines
            .map(x => x.replace(/^                /g, ''))
            .join('\n')

        file.code = parsedCode;
        return file;
    })

    template.files = parsedFiles;
    return template;
})

export default templates;