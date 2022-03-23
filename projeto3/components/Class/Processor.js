class Processor{

    static Process(data){
        var rows = [];
        var a = data.split('\r\n');
        
        a.forEach(row => {
            var arr = row.split(',');
            rows.push(arr);
        });

        return rows;
    }

}

module.exports = Processor;