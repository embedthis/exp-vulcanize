Expansive.load({
    services: {
        name:    'vulcanize-html',
        options: ''

        transforms: {
            mappings: 'html',

            init: function(transform) {
                transform.vulcanize = Cmd.locate('vulcanize')
                if (!transform.vulcanize) {
                    fatal('Cannot find vulcanize')
                }
            },

            render: function(contents, meta, transform) {
                let path = Path('.vulcanize.tmp')
                try {
                    runFile(vulcanize + transform.service.options + ' -o ' + path, contents, meta)
                    contents = path.readString() + '\n'
                } finally {
                    path.remove()
                }
                return contents
            }
        }
    }
})
