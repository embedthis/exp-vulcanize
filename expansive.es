Expansive.load({
    transforms: {
//  MOB - rename
        name:       'vulcanize-html',
        input:      '*',
        output:     '*',
        options:    ''
        script: `
            function transform(contents, meta, service) {
                let vulcanize = Cmd.locate('vulcanize')
                if (!vulcanize) {
                    trace('Warn', 'Cannot find vulcanize')
                    return contents
                }
                let path = Path('.vulcanize.tmp')
                try {
                    runFile(vulcanize + service.options + ' -o ' + path, contents, meta)
                    contents = path.readString() + '\n'
                } finally {
                    path.remove()
                }
                return contents
            }
        `
    }
})
