var fs = require('fs');
var php_read = require('php-parser');
var unparse = require('php-unparser');

var options = {
  indent: true,
  dontUseWhitespaces: false,
  shortArray: false,
  bracketsNewLine: true,
  forceNamespaceBrackets: false,
  collapseEmptyLines: true
};

module.exports = function(twan, tld, dmsID, test) {
    if (arguments.length != 4) {
        return ['you have the wrong number of arguments'];
    }
    if (!parseInt(dmsID)) {
    	return ['the dmsID is not a number'];
    }
    var php_parser = new php_read({
        parser: {
            extractDoc: true,
            php7: true
        },
        ast: {
            withPositions: true
        }
    });
    var path = '/Users/matthew.downs/IgnitionOne/mat/live/' + twan + "/" + tld + "/";
    var testPath = 'insert/testing/path/here'
    var phpFile = fs.readFileSync(path + 'config.php');
    var php = php_parser.parseCode(phpFile);
    php.children[0].expr.items[0].value.value = dmsID;
    var newFile = unparse(php, options);
    // if the test argument is true, then send the new file to a test path, so you can check the file before overwriting anything
    var newFilePath = test === true ? testPath + 'test_config.php' : path + 'config.php';
    fs.writeFile(newFilePath, newFile, (err) => {
        if (err) console.log(err);
        console.log('updated ' + newFilePath + ' file');
    });
};