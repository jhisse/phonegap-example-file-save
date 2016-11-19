var app = {
    initialize: function () {
        this.bindEvents();
    },

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    escreverArquivo: function (evt) {
        evt.preventDefault();

        var $input = document.getElementById('info_id').value;

        var ler = function readFile(fileEntry) {

            fileEntry.file(function (file) {
                var reader = new FileReader();

                reader.onloadend = function () {
                    console.log("Successful file read: " + this.result);
                    document.getElementById('texto').innerHTML = this.result;
                };

                reader.readAsText(file);

            }, console.error);
        };

        var escrever = function writeFile(fileEntry, conteudo) {
            fileEntry.createWriter(function (fileWriter) {

                fileWriter.onwriteend = function () {
                    console.log("Successful file write...");
                    ler(fileEntry);
                };

                fileWriter.onerror = function (e) {
                    console.log("Failed file write: " + e.toString());
                };

                fileWriter.write(conteudo);
            }, console.error);
        };

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile('meuarquivo.txt', {create: true, exclusive: false}, function (fileEntry) {
                escrever(fileEntry, $input);
            }, console.error)
        }, console.error);

    },

    onDeviceReady: function () {
        document.getElementById('salvar_btn').addEventListener('click', app.escreverArquivo);
    }
};
