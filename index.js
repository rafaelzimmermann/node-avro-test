var fs = require('fs');
var DataFile = require('node-avro-io').DataFile;

var writeAvroFile = function() {
    var avro = DataFile.AvroFile();
    var fileStream = fs.createWriteStream('test.avro');

    var schema = 'string';
    var writer = avro.open("test.avro", schema, { flags: 'w', codec: 'deflate' });
    writer.write("The quick brown fox jumped over the lazy dogs");
    writer.write("Another entry");
    writer.write("-------");
    writer.end();
};

// It's not working
var readAvroFile = function() {
    var avro = DataFile.AvroFile();
    var schema = 'string';
    var reader = avro.open('test.avro', { flags: 'r' })
        .on('data', function(data) {
            console.log(data);

        })
        .on('end', function() {
            console.log("done");
        });
    reader.resume();
};


writeAvroFile();
readAvroFile();
