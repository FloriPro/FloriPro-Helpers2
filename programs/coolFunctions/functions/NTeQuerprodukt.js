class makeFunction1 {
    get() {
        return {
            "arguments":
                [{ "name": "start", "type": "number" },
                { "name": "length", "type": "number" },
                { "name": "iteration", "type": "number" }],
            "type": "line",
            "title": "NTe Querprodukt",
        };
    }
    run(start, length, iteration) {
        function Querprodukt(num) {
            var i = 1;

            for (var x of num.toString()) {
                i *= Number.parseInt(x);
            }

            return i;
        }

        /**
         * rekursiv! Herr L***e wird stolz sein!
         * ruft i mal a() auf
         */
        function NTeQuerprodukt(x, i) {
            if (i == 0) {
                return x;
            }
            return NTeQuerprodukt(Querprodukt(x), i - 1);
        }

        function getData(start, length, iteration) {
            var dat;
            dat = [];

            for (var x = start; x < length + start; x++) {
                dat.push({ "data": NTeQuerprodukt(x, iteration), "label": x });
            }

            return dat;
        }

        return getData(start, length, iteration);
    }
}
makeFunction1