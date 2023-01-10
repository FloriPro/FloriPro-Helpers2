class makeFunction1 {
    get() {
        return {
            "arguments":
                [{ "name": "start", "type": "number" },
                { "name": "length", "type": "number" }],
            "type": "line",
            "title": "IterationenBisQuerproduktKleinerZehn",
        };
    }
    run(start, length) {
        function Querprodukt(num) {
            var i = 1;

            for (var x of num.toString()) {
                i *= Number.parseInt(x);
            }

            return i;
        }

        function IterationenBisQuerproduktKleinerZehn(num) {
            if (num < 10) {
                return 0;
            }

            var i = 0;

            while (true) {
                num = Querprodukt(num);
                i += 1;

                if (num < 10) {
                    return i;
                }
            }
        }

        function getData(start, length) {
            var dat;
            dat = [];

            for (var x = start; x < length + start; x++) {
                dat.push({ "data": IterationenBisQuerproduktKleinerZehn(x), "label": x });
            }

            return dat;
        }

        return getData(start, length);
    }
}
makeFunction1