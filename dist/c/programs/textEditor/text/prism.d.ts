export namespace languages {
    export namespace markup {
        namespace tag { }
        namespace doctype { }
    }
    import html = markup;
    export { html };
    import mathml = markup;
    export { mathml };
    import svg = markup;
    export { svg };
    export const xml: any;
    import ssml = xml;
    export { ssml };
    import atom = xml;
    export { atom };
    import rss = xml;
    export { rss };
    export const clike: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        }[];
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        "class-name": {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                punctuation: RegExp;
            };
        };
        keyword: RegExp;
        boolean: RegExp;
        function: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const javascript: any;
    import js = javascript;
    export { js };
    export const abap: {
        comment: RegExp;
        string: RegExp;
        "string-template": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        "eol-comment": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        keyword: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        number: RegExp;
        operator: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        "string-operator": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        "token-operator": ({
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        } | {
            pattern: RegExp;
            alias: string;
            lookbehind?: undefined;
        })[];
        punctuation: RegExp;
    };
    export const actionscript: any;
    export namespace ada {
        const comment: RegExp;
        const string: RegExp;
        const number: {
            pattern: RegExp;
        }[];
        namespace attribute {
            const pattern: RegExp;
            const alias: string;
        }
        const keyword: RegExp;
        const boolean: RegExp;
        const operator: RegExp;
        const punctuation: RegExp;
        const char: RegExp;
        const variable: RegExp;
    }
    export const al: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        function: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        keyword: RegExp[];
        number: RegExp;
        boolean: RegExp;
        variable: RegExp;
        "class-name": RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const antlr4: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        "character-class": {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
            inside: {
                range: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    alias: string;
                };
                escape: RegExp;
                punctuation: RegExp;
            };
        };
        action: {
            pattern: RegExp;
            greedy: boolean;
            inside: {
                content: {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
                punctuation: RegExp;
            };
        };
        command: {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                function: RegExp;
                punctuation: RegExp;
            };
        };
        annotation: {
            pattern: RegExp;
            alias: string;
        };
        label: {
            pattern: RegExp;
            alias: string;
        };
        keyword: RegExp;
        definition: {
            pattern: RegExp;
            alias: string[];
        }[];
        constant: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    import g4 = antlr4;
    export { g4 };
    export const apacheconf: {
        comment: RegExp;
        "directive-inline": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        "directive-block": {
            pattern: RegExp;
            inside: {
                "directive-block": {
                    pattern: RegExp;
                    inside: {
                        punctuation: RegExp;
                    };
                    alias: string;
                };
                "directive-block-parameter": {
                    pattern: RegExp;
                    inside: {
                        punctuation: RegExp;
                        string: {
                            pattern: RegExp;
                            inside: {
                                variable: RegExp;
                            };
                        };
                    };
                    alias: string;
                };
                punctuation: RegExp;
            };
            alias: string;
        };
        "directive-flags": {
            pattern: RegExp;
            alias: string;
        };
        string: {
            pattern: RegExp;
            inside: {
                variable: RegExp;
            };
        };
        variable: RegExp;
        regex: RegExp;
    };
    export namespace sql {
        export namespace comment_1 {
            const pattern_1: RegExp;
            export { pattern_1 as pattern };
            export const lookbehind: boolean;
        }
        export { comment_1 as comment };
        const variable_1: (RegExp | {
            pattern: RegExp;
            greedy: boolean;
        })[];
        export { variable_1 as variable };
        export namespace string_1 {
            const pattern_2: RegExp;
            export { pattern_2 as pattern };
            export const greedy: boolean;
            const lookbehind_1: boolean;
            export { lookbehind_1 as lookbehind };
        }
        export { string_1 as string };
        export namespace identifier {
            const pattern_3: RegExp;
            export { pattern_3 as pattern };
            const greedy_1: boolean;
            export { greedy_1 as greedy };
            const lookbehind_2: boolean;
            export { lookbehind_2 as lookbehind };
            export namespace inside {
                const punctuation_1: RegExp;
                export { punctuation_1 as punctuation };
            }
        }
        const _function: RegExp;
        export { _function as function };
        const keyword_1: RegExp;
        export { keyword_1 as keyword };
        const boolean_1: RegExp;
        export { boolean_1 as boolean };
        const number_1: RegExp;
        export { number_1 as number };
        const operator_1: RegExp;
        export { operator_1 as operator };
        const punctuation_2: RegExp;
        export { punctuation_2 as punctuation };
    }
    export const apl: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        number: RegExp;
        statement: RegExp;
        "system-function": {
            pattern: RegExp;
            alias: string;
        };
        constant: RegExp;
        function: RegExp;
        "monadic-operator": {
            pattern: RegExp;
            alias: string;
        };
        "dyadic-operator": {
            pattern: RegExp;
            alias: string;
        };
        assignment: {
            pattern: RegExp;
            alias: string;
        };
        punctuation: RegExp;
        dfn: {
            pattern: RegExp;
            alias: string;
        };
    };
    export const applescript: {
        comment: RegExp[];
        string: RegExp;
        number: RegExp;
        operator: RegExp[];
        keyword: RegExp;
        "class-name": RegExp;
        punctuation: RegExp;
    };
    export namespace aql {
        const comment_2: RegExp;
        export { comment_2 as comment };
        export namespace property {
            const pattern_4: RegExp;
            export { pattern_4 as pattern };
            const lookbehind_3: boolean;
            export { lookbehind_3 as lookbehind };
            const greedy_2: boolean;
            export { greedy_2 as greedy };
        }
        export namespace string_2 {
            const pattern_5: RegExp;
            export { pattern_5 as pattern };
            const greedy_3: boolean;
            export { greedy_3 as greedy };
        }
        export { string_2 as string };
        export namespace identifier_1 {
            const pattern_6: RegExp;
            export { pattern_6 as pattern };
            const greedy_4: boolean;
            export { greedy_4 as greedy };
        }
        export { identifier_1 as identifier };
        const variable_2: RegExp;
        export { variable_2 as variable };
        const keyword_2: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        } | {
            pattern: RegExp;
            lookbehind?: undefined;
        })[];
        export { keyword_2 as keyword };
        const _function_1: RegExp;
        export { _function_1 as function };
        const boolean_2: RegExp;
        export { boolean_2 as boolean };
        export namespace range {
            const pattern_7: RegExp;
            export { pattern_7 as pattern };
            const alias_1: string;
            export { alias_1 as alias };
        }
        const number_2: RegExp[];
        export { number_2 as number };
        const operator_2: RegExp;
        export { operator_2 as operator };
        const punctuation_3: RegExp;
        export { punctuation_3 as punctuation };
    }
    export const c: any;
    export const arduino: any;
    import ino = arduino;
    export { ino };
    export namespace arff {
        const comment_3: RegExp;
        export { comment_3 as comment };
        export namespace string_3 {
            const pattern_8: RegExp;
            export { pattern_8 as pattern };
            const greedy_5: boolean;
            export { greedy_5 as greedy };
        }
        export { string_3 as string };
        const keyword_3: RegExp;
        export { keyword_3 as keyword };
        const number_3: RegExp;
        export { number_3 as number };
        const punctuation_4: RegExp;
        export { punctuation_4 as punctuation };
    }
    export const armasm: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
            inside: {
                variable: {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
            };
        };
        char: {
            pattern: RegExp;
            greedy: boolean;
        };
        "version-symbol": {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
        };
        boolean: RegExp;
        directive: {
            pattern: RegExp;
            alias: string;
        };
        instruction: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        variable: RegExp;
        number: RegExp;
        register: {
            pattern: RegExp;
            alias: string;
        };
        operator: RegExp;
        punctuation: RegExp;
    };
    import _arm_asm = armasm;
    export { _arm_asm as arm-asm };
    export const aspnet: any;
    export const asm6502: {
        comment: RegExp;
        directive: {
            pattern: RegExp;
            alias: string;
        };
        string: RegExp;
        "op-code": {
            pattern: RegExp;
            alias: string;
        };
        "hex-number": {
            pattern: RegExp;
            alias: string;
        };
        "binary-number": {
            pattern: RegExp;
            alias: string;
        };
        "decimal-number": {
            pattern: RegExp;
            alias: string;
        };
        register: {
            pattern: RegExp;
            alias: string;
        };
        punctuation: RegExp;
    };
    export const asmatmel: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        constant: RegExp;
        directive: {
            pattern: RegExp;
            alias: string;
        };
        "r-register": {
            pattern: RegExp;
            alias: string;
        };
        "op-code": {
            pattern: RegExp;
            alias: string;
        };
        "hex-number": {
            pattern: RegExp;
            alias: string;
        };
        "binary-number": {
            pattern: RegExp;
            alias: string;
        };
        "decimal-number": {
            pattern: RegExp;
            alias: string;
        };
        register: {
            pattern: RegExp;
            alias: string;
        };
        operator: RegExp;
        punctuation: RegExp;
    };
    export namespace autohotkey {
        const comment_4: ({
            pattern: RegExp;
            lookbehind: boolean;
            greedy?: undefined;
        } | {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        })[];
        export { comment_4 as comment };
        export namespace tag {
            const pattern_9: RegExp;
            export { pattern_9 as pattern };
            const lookbehind_4: boolean;
            export { lookbehind_4 as lookbehind };
        }
        const string_4: RegExp;
        export { string_4 as string };
        const variable_3: RegExp;
        export { variable_3 as variable };
        const number_4: RegExp;
        export { number_4 as number };
        const operator_3: RegExp;
        export { operator_3 as operator };
        const boolean_3: RegExp;
        export { boolean_3 as boolean };
        export namespace command {
            const pattern_10: RegExp;
            export { pattern_10 as pattern };
            const alias_2: string;
            export { alias_2 as alias };
        }
        export const constant: RegExp;
        export const builtin: RegExp;
        export const symbol: RegExp;
        export namespace directive {
            const pattern_11: RegExp;
            export { pattern_11 as pattern };
            const alias_3: string;
            export { alias_3 as alias };
        }
        const keyword_4: RegExp;
        export { keyword_4 as keyword };
        const _function_2: RegExp;
        export { _function_2 as function };
        const punctuation_5: RegExp;
        export { punctuation_5 as punctuation };
    }
    export namespace autoit {
        const comment_5: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        export { comment_5 as comment };
        export namespace url {
            const pattern_12: RegExp;
            export { pattern_12 as pattern };
            const lookbehind_5: boolean;
            export { lookbehind_5 as lookbehind };
        }
        export namespace string_5 {
            const pattern_13: RegExp;
            export { pattern_13 as pattern };
            const greedy_6: boolean;
            export { greedy_6 as greedy };
            export namespace inside_1 {
                const variable_4: RegExp;
                export { variable_4 as variable };
            }
            export { inside_1 as inside };
        }
        export { string_5 as string };
        export namespace directive_1 {
            const pattern_14: RegExp;
            export { pattern_14 as pattern };
            const lookbehind_6: boolean;
            export { lookbehind_6 as lookbehind };
            const alias_4: string;
            export { alias_4 as alias };
        }
        export { directive_1 as directive };
        const _function_3: RegExp;
        export { _function_3 as function };
        const variable_5: RegExp;
        export { variable_5 as variable };
        const keyword_5: RegExp;
        export { keyword_5 as keyword };
        const number_5: RegExp;
        export { number_5 as number };
        const boolean_4: RegExp;
        export { boolean_4 as boolean };
        const operator_4: RegExp;
        export { operator_4 as operator };
        const punctuation_6: RegExp;
        export { punctuation_6 as punctuation };
    }
    const _avro_idl: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        annotation: {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
        };
        "function-identifier": {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
        };
        identifier: {
            pattern: RegExp;
            greedy: boolean;
        };
        "class-name": {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        keyword: RegExp;
        function: RegExp;
        number: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        operator: RegExp;
        punctuation: RegExp;
    };
    export { _avro_idl as avro-idl };
    export const avdl: any;
    export namespace awk {
        export namespace hashbang {
            const pattern_15: RegExp;
            export { pattern_15 as pattern };
            const greedy_7: boolean;
            export { greedy_7 as greedy };
            const alias_5: string;
            export { alias_5 as alias };
        }
        export namespace comment_6 {
            const pattern_16: RegExp;
            export { pattern_16 as pattern };
            const greedy_8: boolean;
            export { greedy_8 as greedy };
        }
        export { comment_6 as comment };
        export namespace string_6 {
            const pattern_17: RegExp;
            export { pattern_17 as pattern };
            const lookbehind_7: boolean;
            export { lookbehind_7 as lookbehind };
            const greedy_9: boolean;
            export { greedy_9 as greedy };
        }
        export { string_6 as string };
        export namespace regex {
            const pattern_18: RegExp;
            export { pattern_18 as pattern };
            const lookbehind_8: boolean;
            export { lookbehind_8 as lookbehind };
            const greedy_10: boolean;
            export { greedy_10 as greedy };
        }
        const variable_6: RegExp;
        export { variable_6 as variable };
        const keyword_6: RegExp;
        export { keyword_6 as keyword };
        const _function_4: RegExp;
        export { _function_4 as function };
        const number_6: RegExp;
        export { number_6 as number };
        const operator_5: RegExp;
        export { operator_5 as operator };
        const punctuation_7: RegExp;
        export { punctuation_7 as punctuation };
    }
    import gawk = awk;
    export { gawk };
    export namespace basic {
        export namespace comment_7 {
            const pattern_19: RegExp;
            export { pattern_19 as pattern };
            export namespace inside_2 {
                const keyword_7: RegExp;
                export { keyword_7 as keyword };
            }
            export { inside_2 as inside };
        }
        export { comment_7 as comment };
        export namespace string_7 {
            const pattern_20: RegExp;
            export { pattern_20 as pattern };
            const greedy_11: boolean;
            export { greedy_11 as greedy };
        }
        export { string_7 as string };
        const number_7: RegExp;
        export { number_7 as number };
        const keyword_8: RegExp;
        export { keyword_8 as keyword };
        const _function_5: RegExp;
        export { _function_5 as function };
        const operator_6: RegExp;
        export { operator_6 as operator };
        const punctuation_8: RegExp;
        export { punctuation_8 as punctuation };
    }
    export namespace bbcode {
        export namespace tag_1 {
            const pattern_21: RegExp;
            export { pattern_21 as pattern };
            const inside_3: {
                tag: {
                    pattern: RegExp;
                    inside: {
                        punctuation: RegExp;
                    };
                };
                "attr-value": {
                    pattern: RegExp;
                    inside: {
                        punctuation: (RegExp | {
                            pattern: RegExp;
                            lookbehind: boolean;
                        })[];
                    };
                };
                punctuation: RegExp;
                "attr-name": RegExp;
            };
            export { inside_3 as inside };
        }
        export { tag_1 as tag };
    }
    import shortcode = bbcode;
    export { shortcode };
    export const bicep: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        }[];
        property: ({
            pattern: RegExp;
            lookbehind: boolean;
            greedy?: undefined;
        } | {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        })[];
        string: ({
            pattern: RegExp;
            greedy: boolean;
            lookbehind?: undefined;
        } | {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        })[];
        "interpolated-string": {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            inside: {
                interpolation: {
                    pattern: RegExp;
                    inside: {
                        expression: {
                            pattern: RegExp;
                            lookbehind: boolean;
                        };
                        punctuation: RegExp;
                    };
                };
                string: RegExp;
            };
        };
        datatype: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        boolean: RegExp;
        keyword: RegExp;
        decorator: RegExp;
        function: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const birb: any;
    export const bison: any;
    export namespace bnf {
        export namespace string_8 {
            const pattern_22: RegExp;
            export { pattern_22 as pattern };
        }
        export { string_8 as string };
        export namespace definition {
            const pattern_23: RegExp;
            export { pattern_23 as pattern };
            const alias_6: string[];
            export { alias_6 as alias };
            export namespace inside_4 {
                const punctuation_9: RegExp;
                export { punctuation_9 as punctuation };
            }
            export { inside_4 as inside };
        }
        export namespace rule {
            const pattern_24: RegExp;
            export { pattern_24 as pattern };
            export namespace inside_5 {
                const punctuation_10: RegExp;
                export { punctuation_10 as punctuation };
            }
            export { inside_5 as inside };
        }
        const operator_7: RegExp;
        export { operator_7 as operator };
    }
    import rbnf = bnf;
    export { rbnf };
    export const bqn: {
        shebang: {
            pattern: RegExp;
            alias: string;
            greedy: boolean;
        };
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        "string-literal": {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
        };
        "character-literal": {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
        };
        function: RegExp;
        "dot-notation-on-brackets": {
            pattern: RegExp;
            alias: string;
        };
        "special-name": {
            pattern: RegExp;
            alias: string;
        };
        "dot-notation-on-name": {
            pattern: RegExp;
            alias: string;
        };
        "word-number-scientific": {
            pattern: RegExp;
            alias: string;
        };
        "word-name": {
            pattern: RegExp;
            alias: string;
        };
        "word-number": {
            pattern: RegExp;
            alias: string;
        };
        "null-literal": {
            pattern: RegExp;
            alias: string;
        };
        "primitive-functions": {
            pattern: RegExp;
            alias: string;
        };
        "primitive-1-operators": {
            pattern: RegExp;
            alias: string;
        };
        "primitive-2-operators": {
            pattern: RegExp;
            alias: string;
        };
        punctuation: RegExp;
    };
    export namespace brainfuck {
        export namespace pointer {
            const pattern_25: RegExp;
            export { pattern_25 as pattern };
            const alias_7: string;
            export { alias_7 as alias };
        }
        export namespace increment {
            const pattern_26: RegExp;
            export { pattern_26 as pattern };
            const alias_8: string;
            export { alias_8 as alias };
        }
        export namespace decrement {
            const pattern_27: RegExp;
            export { pattern_27 as pattern };
            const alias_9: string;
            export { alias_9 as alias };
        }
        export namespace branching {
            const pattern_28: RegExp;
            export { pattern_28 as pattern };
            const alias_10: string;
            export { alias_10 as alias };
        }
        const operator_8: RegExp;
        export { operator_8 as operator };
        const comment_8: RegExp;
        export { comment_8 as comment };
    }
    export const brightscript: {
        comment: RegExp;
        "directive-statement": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
            inside: {
                "error-message": {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
                directive: {
                    pattern: RegExp;
                    alias: string;
                };
                expression: {
                    pattern: RegExp;
                    inside: any;
                };
            };
        };
        property: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        "class-name": {
            pattern: RegExp;
            lookbehind: boolean;
        };
        keyword: RegExp;
        boolean: RegExp;
        function: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
        constant: RegExp;
    };
    export namespace bro {
        export namespace comment_9 {
            const pattern_29: RegExp;
            export { pattern_29 as pattern };
            const lookbehind_9: boolean;
            export { lookbehind_9 as lookbehind };
            export namespace inside_6 {
                const italic: RegExp;
            }
            export { inside_6 as inside };
        }
        export { comment_9 as comment };
        export namespace string_9 {
            const pattern_30: RegExp;
            export { pattern_30 as pattern };
            const greedy_12: boolean;
            export { greedy_12 as greedy };
        }
        export { string_9 as string };
        const boolean_5: RegExp;
        export { boolean_5 as boolean };
        export namespace _function_6 {
            const pattern_31: RegExp;
            export { pattern_31 as pattern };
            const lookbehind_10: boolean;
            export { lookbehind_10 as lookbehind };
        }
        export { _function_6 as function };
        const builtin_1: RegExp;
        export { builtin_1 as builtin };
        export namespace constant_1 {
            const pattern_32: RegExp;
            export { pattern_32 as pattern };
            const lookbehind_11: boolean;
            export { lookbehind_11 as lookbehind };
        }
        export { constant_1 as constant };
        const keyword_9: RegExp;
        export { keyword_9 as keyword };
        const operator_9: RegExp;
        export { operator_9 as operator };
        const number_8: RegExp;
        export { number_8 as number };
        const punctuation_11: RegExp;
        export { punctuation_11 as punctuation };
    }
    export namespace bsl {
        const comment_10: RegExp;
        export { comment_10 as comment };
        const string_10: ({
            pattern: RegExp;
            greedy: boolean;
        } | {
            pattern: RegExp;
            greedy?: undefined;
        })[];
        export { string_10 as string };
        const keyword_10: ({
            pattern: RegExp;
            lookbehind: boolean;
        } | {
            pattern: RegExp;
            lookbehind?: undefined;
        })[];
        export { keyword_10 as keyword };
        export namespace number_9 {
            const pattern_33: RegExp;
            export { pattern_33 as pattern };
            const lookbehind_12: boolean;
            export { lookbehind_12 as lookbehind };
        }
        export { number_9 as number };
        const operator_10: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        } | {
            pattern: RegExp;
            lookbehind?: undefined;
        })[];
        export { operator_10 as operator };
        const punctuation_12: RegExp;
        export { punctuation_12 as punctuation };
        const directive_2: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            alias: string;
        }[];
        export { directive_2 as directive };
    }
    import oscript = bsl;
    export { oscript };
    export const cfscript: any;
    import cfc = cfscript;
    export { cfc };
    export const chaiscript: any;
    export namespace cil {
        const comment_11: RegExp;
        export { comment_11 as comment };
        export namespace string_11 {
            const pattern_34: RegExp;
            export { pattern_34 as pattern };
            const greedy_13: boolean;
            export { greedy_13 as greedy };
        }
        export { string_11 as string };
        export namespace directive_3 {
            const pattern_35: RegExp;
            export { pattern_35 as pattern };
            const lookbehind_13: boolean;
            export { lookbehind_13 as lookbehind };
            const alias_11: string;
            export { alias_11 as alias };
        }
        export { directive_3 as directive };
        const variable_7: RegExp;
        export { variable_7 as variable };
        const keyword_11: RegExp;
        export { keyword_11 as keyword };
        const _function_7: RegExp;
        export { _function_7 as function };
        const boolean_6: RegExp;
        export { boolean_6 as boolean };
        const number_10: RegExp;
        export { number_10 as number };
        const punctuation_13: RegExp;
        export { punctuation_13 as punctuation };
    }
    export const cilkc: {};
    import _cilk_c = cilkc;
    export { _cilk_c as cilk-c };
    export const cilkcpp: {};
    import _cilk_cpp = cilkcpp;
    export { _cilk_cpp as cilk-cpp };
    import cilk = cilkcpp;
    export { cilk };
    export namespace clojure {
        export namespace comment_12 {
            const pattern_36: RegExp;
            export { pattern_36 as pattern };
            const greedy_14: boolean;
            export { greedy_14 as greedy };
        }
        export { comment_12 as comment };
        export namespace string_12 {
            const pattern_37: RegExp;
            export { pattern_37 as pattern };
            const greedy_15: boolean;
            export { greedy_15 as greedy };
        }
        export { string_12 as string };
        const char_1: RegExp;
        export { char_1 as char };
        export namespace symbol_1 {
            const pattern_38: RegExp;
            export { pattern_38 as pattern };
            const lookbehind_14: boolean;
            export { lookbehind_14 as lookbehind };
        }
        export { symbol_1 as symbol };
        export namespace keyword_12 {
            const pattern_39: RegExp;
            export { pattern_39 as pattern };
            const lookbehind_15: boolean;
            export { lookbehind_15 as lookbehind };
        }
        export { keyword_12 as keyword };
        const boolean_7: RegExp;
        export { boolean_7 as boolean };
        export namespace number_11 {
            const pattern_40: RegExp;
            export { pattern_40 as pattern };
            const lookbehind_16: boolean;
            export { lookbehind_16 as lookbehind };
        }
        export { number_11 as number };
        export namespace _function_8 {
            const pattern_41: RegExp;
            export { pattern_41 as pattern };
            const lookbehind_17: boolean;
            export { lookbehind_17 as lookbehind };
        }
        export { _function_8 as function };
        const operator_11: RegExp;
        export { operator_11 as operator };
        const punctuation_14: RegExp;
        export { punctuation_14 as punctuation };
    }
    export namespace cmake {
        const comment_13: RegExp;
        export { comment_13 as comment };
        export namespace string_13 {
            const pattern_42: RegExp;
            export { pattern_42 as pattern };
            const greedy_16: boolean;
            export { greedy_16 as greedy };
            export namespace inside_7 {
                namespace interpolation {
                    const pattern_43: RegExp;
                    export { pattern_43 as pattern };
                    export namespace inside_8 {
                        const punctuation_15: RegExp;
                        export { punctuation_15 as punctuation };
                        const variable_8: RegExp;
                        export { variable_8 as variable };
                    }
                    export { inside_8 as inside };
                }
            }
            export { inside_7 as inside };
        }
        export { string_13 as string };
        const variable_9: RegExp;
        export { variable_9 as variable };
        const property_1: RegExp;
        export { property_1 as property };
        const keyword_13: RegExp;
        export { keyword_13 as keyword };
        const boolean_8: RegExp;
        export { boolean_8 as boolean };
        export const namespace: RegExp;
        const operator_12: RegExp;
        export { operator_12 as operator };
        export namespace inserted {
            const pattern_44: RegExp;
            export { pattern_44 as pattern };
            const alias_12: string;
            export { alias_12 as alias };
        }
        const number_12: RegExp;
        export { number_12 as number };
        const _function_9: RegExp;
        export { _function_9 as function };
        const punctuation_16: RegExp;
        export { punctuation_16 as punctuation };
    }
    export const cobol: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        level: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            alias: string;
        };
        "class-name": {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                number: {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
                punctuation: RegExp;
            };
        };
        keyword: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        boolean: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        number: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        operator: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        punctuation: RegExp;
    };
    export namespace concurnas {
        export namespace comment_14 {
            const pattern_45: RegExp;
            export { pattern_45 as pattern };
            const lookbehind_18: boolean;
            export { lookbehind_18 as lookbehind };
            const greedy_17: boolean;
            export { greedy_17 as greedy };
        }
        export { comment_14 as comment };
        export namespace langext {
            const pattern_46: RegExp;
            export { pattern_46 as pattern };
            const greedy_18: boolean;
            export { greedy_18 as greedy };
            const inside_9: {
                "class-name": RegExp;
                string: {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
                punctuation: RegExp;
            };
            export { inside_9 as inside };
        }
        export namespace _function_10 {
            const pattern_47: RegExp;
            export { pattern_47 as pattern };
            const lookbehind_19: boolean;
            export { lookbehind_19 as lookbehind };
        }
        export { _function_10 as function };
        const keyword_14: RegExp;
        export { keyword_14 as keyword };
        const boolean_9: RegExp;
        export { boolean_9 as boolean };
        const number_13: RegExp;
        export { number_13 as number };
        const punctuation_17: RegExp;
        export { punctuation_17 as punctuation };
        const operator_13: RegExp;
        export { operator_13 as operator };
        export namespace annotation {
            const pattern_48: RegExp;
            export { pattern_48 as pattern };
            const alias_13: string;
            export { alias_13 as alias };
        }
    }
    import conc = concurnas;
    export { conc };
    export namespace csv {
        export const value: RegExp;
        const punctuation_18: RegExp;
        export { punctuation_18 as punctuation };
    }
    export const cypher: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        "class-name": {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        relationship: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            alias: string;
        };
        identifier: {
            pattern: RegExp;
            greedy: boolean;
        };
        variable: RegExp;
        keyword: RegExp;
        function: RegExp;
        boolean: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const d: any;
    export const dax: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        "data-field": {
            pattern: RegExp;
            alias: string;
        };
        measure: {
            pattern: RegExp;
            alias: string;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        function: RegExp;
        keyword: RegExp;
        boolean: {
            pattern: RegExp;
            alias: string;
        };
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const dhall: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
            inside: {
                interpolation: {
                    pattern: RegExp;
                    inside: {
                        expression: {
                            pattern: RegExp;
                            lookbehind: boolean;
                            alias: string;
                            inside: any;
                        };
                        punctuation: RegExp;
                    };
                };
            };
        };
        label: {
            pattern: RegExp;
            greedy: boolean;
        };
        url: {
            pattern: RegExp;
            greedy: boolean;
        };
        env: {
            pattern: RegExp;
            greedy: boolean;
            inside: {
                function: RegExp;
                operator: RegExp;
                variable: RegExp;
            };
        };
        hash: {
            pattern: RegExp;
            inside: {
                function: RegExp;
                operator: RegExp;
                number: RegExp;
            };
        };
        keyword: RegExp;
        builtin: RegExp;
        boolean: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
        "class-name": RegExp;
    };
    export namespace _dns_zone_file {
        const comment_15: RegExp;
        export { comment_15 as comment };
        export namespace string_14 {
            const pattern_49: RegExp;
            export { pattern_49 as pattern };
            const greedy_19: boolean;
            export { greedy_19 as greedy };
        }
        export { string_14 as string };
        const variable_10: {
            pattern: RegExp;
            lookbehind: boolean;
        }[];
        export { variable_10 as variable };
        const keyword_15: RegExp;
        export { keyword_15 as keyword };
        export namespace _class {
            const pattern_50: RegExp;
            export { pattern_50 as pattern };
            const lookbehind_20: boolean;
            export { lookbehind_20 as lookbehind };
            const alias_14: string;
            export { alias_14 as alias };
        }
        export { _class as class };
        export namespace type {
            const pattern_51: RegExp;
            export { pattern_51 as pattern };
            const lookbehind_21: boolean;
            export { lookbehind_21 as lookbehind };
            const alias_15: string;
            export { alias_15 as alias };
        }
        const punctuation_19: RegExp;
        export { punctuation_19 as punctuation };
    }
    export { _dns_zone_file as dns-zone-file };
    const _dns_zone: any;
    export { _dns_zone as dns-zone };
    export namespace ebnf {
        const comment_16: RegExp;
        export { comment_16 as comment };
        export namespace string_15 {
            const pattern_52: RegExp;
            export { pattern_52 as pattern };
            const greedy_20: boolean;
            export { greedy_20 as greedy };
        }
        export { string_15 as string };
        export namespace special {
            const pattern_53: RegExp;
            export { pattern_53 as pattern };
            const greedy_21: boolean;
            export { greedy_21 as greedy };
            const alias_16: string;
            export { alias_16 as alias };
        }
        export namespace definition_1 {
            const pattern_54: RegExp;
            export { pattern_54 as pattern };
            const lookbehind_22: boolean;
            export { lookbehind_22 as lookbehind };
            const alias_17: string[];
            export { alias_17 as alias };
        }
        export { definition_1 as definition };
        const rule_1: RegExp;
        export { rule_1 as rule };
        const punctuation_20: RegExp;
        export { punctuation_20 as punctuation };
        const operator_14: RegExp;
        export { operator_14 as operator };
    }
    export namespace editorconfig {
        const comment_17: RegExp;
        export { comment_17 as comment };
        export namespace section {
            const pattern_55: RegExp;
            export { pattern_55 as pattern };
            const lookbehind_23: boolean;
            export { lookbehind_23 as lookbehind };
            const alias_18: string;
            export { alias_18 as alias };
            export namespace inside_10 {
                const regex_1: RegExp;
                export { regex_1 as regex };
                const operator_15: RegExp;
                export { operator_15 as operator };
                const punctuation_21: RegExp;
                export { punctuation_21 as punctuation };
            }
            export { inside_10 as inside };
        }
        export namespace key {
            const pattern_56: RegExp;
            export { pattern_56 as pattern };
            const lookbehind_24: boolean;
            export { lookbehind_24 as lookbehind };
            const alias_19: string;
            export { alias_19 as alias };
        }
        export namespace value_1 {
            const pattern_57: RegExp;
            export { pattern_57 as pattern };
            const alias_20: string;
            export { alias_20 as alias };
            export namespace inside_11 {
                const punctuation_22: RegExp;
                export { punctuation_22 as punctuation };
            }
            export { inside_11 as inside };
        }
        export { value_1 as value };
    }
    export const eiffel: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        }[];
        char: RegExp;
        keyword: RegExp;
        boolean: RegExp;
        "class-name": RegExp;
        number: RegExp[];
        punctuation: RegExp;
        operator: RegExp;
    };
    export const elixir: {
        doc: {
            pattern: RegExp;
            inside: {
                attribute: RegExp;
                string: RegExp;
            };
        };
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        regex: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
            inside: {};
        }[];
        atom: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        module: {
            pattern: RegExp;
            alias: string;
        };
        "attr-name": RegExp;
        argument: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        attribute: {
            pattern: RegExp;
            alias: string;
        };
        function: RegExp;
        number: RegExp;
        keyword: RegExp;
        boolean: RegExp;
        operator: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        punctuation: RegExp;
    };
    export const elm: {
        comment: RegExp;
        char: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        }[];
        "import-statement": {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                keyword: RegExp;
            };
        };
        keyword: RegExp;
        builtin: RegExp;
        number: RegExp;
        operator: RegExp;
        hvariable: RegExp;
        constant: RegExp;
        punctuation: RegExp;
    };
    export namespace lua {
        const comment_18: RegExp;
        export { comment_18 as comment };
        export namespace string_16 {
            const pattern_58: RegExp;
            export { pattern_58 as pattern };
            const greedy_22: boolean;
            export { greedy_22 as greedy };
        }
        export { string_16 as string };
        const number_14: RegExp;
        export { number_14 as number };
        const keyword_16: RegExp;
        export { keyword_16 as keyword };
        const _function_11: RegExp;
        export { _function_11 as function };
        const operator_16: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        export { operator_16 as operator };
        const punctuation_23: RegExp;
        export { punctuation_23 as punctuation };
    }
    export const erlang: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        "quoted-function": {
            pattern: RegExp;
            alias: string;
        };
        "quoted-atom": {
            pattern: RegExp;
            alias: string;
        };
        boolean: RegExp;
        keyword: RegExp;
        number: RegExp[];
        function: RegExp;
        variable: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        operator: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        atom: RegExp;
        punctuation: RegExp;
    };
    const _excel_formula: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        reference: {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
            inside: {
                operator: RegExp;
                punctuation: RegExp;
                sheet: {
                    pattern: RegExp;
                    alias: string;
                };
                file: {
                    pattern: RegExp;
                    inside: {
                        punctuation: RegExp;
                    };
                };
                path: RegExp;
            };
        };
        "function-name": {
            pattern: RegExp;
            alias: string;
        };
        range: {
            pattern: RegExp;
            alias: string;
            inside: {
                operator: RegExp;
                cell: RegExp;
                column: RegExp;
                row: RegExp;
            };
        };
        cell: {
            pattern: RegExp;
            alias: string;
        };
        number: RegExp;
        boolean: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export { _excel_formula as excel-formula };
    export const xlsx: any;
    export const xls: any;
    export const fsharp: any;
    const _firestore_security_rules: any;
    export { _firestore_security_rules as firestore-security-rules };
    export const fortran: {
        "quoted-number": {
            pattern: RegExp;
            alias: string;
        };
        string: {
            pattern: RegExp;
            inside: {
                comment: {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
            };
        };
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        boolean: RegExp;
        number: RegExp;
        keyword: RegExp[];
        operator: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        punctuation: RegExp;
    };
    export const gamemakerlanguage: any;
    export const gml: any;
    export namespace gap {
        namespace shell {
            namespace inside {
                namespace gap {
                    import inside_12 = Prism.languages.gap;
                    export { inside_12 as inside };
                }
            }
        }
    }
    export namespace gcode {
        const comment_19: RegExp;
        export { comment_19 as comment };
        export namespace string_17 {
            const pattern_59: RegExp;
            export { pattern_59 as pattern };
            const greedy_23: boolean;
            export { greedy_23 as greedy };
        }
        export { string_17 as string };
        const keyword_17: RegExp;
        export { keyword_17 as keyword };
        const property_2: RegExp;
        export { property_2 as property };
        export namespace checksum {
            const pattern_60: RegExp;
            export { pattern_60 as pattern };
            const lookbehind_25: boolean;
            export { lookbehind_25 as lookbehind };
            const alias_21: string;
            export { alias_21 as alias };
        }
        const punctuation_24: RegExp;
        export { punctuation_24 as punctuation };
    }
    export const gdscript: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        "class-name": {
            pattern: RegExp;
            lookbehind: boolean;
        };
        keyword: RegExp;
        function: RegExp;
        variable: RegExp;
        number: RegExp[];
        constant: RegExp;
        boolean: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const gedcom: {
        "line-value": {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                pointer: {
                    pattern: RegExp;
                    alias: string;
                };
            };
        };
        record: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        level: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        pointer: {
            pattern: RegExp;
            alias: string;
        };
    };
    export namespace gettext {
        const comment_20: ({
            pattern: RegExp;
            greedy: boolean;
            alias: string;
        } | {
            pattern: RegExp;
            greedy: boolean;
            alias?: undefined;
        })[];
        export { comment_20 as comment };
        export namespace string_18 {
            const pattern_61: RegExp;
            export { pattern_61 as pattern };
            const lookbehind_26: boolean;
            export { lookbehind_26 as lookbehind };
            const greedy_24: boolean;
            export { greedy_24 as greedy };
        }
        export { string_18 as string };
        const keyword_18: RegExp;
        export { keyword_18 as keyword };
        const number_15: RegExp;
        export { number_15 as number };
        const punctuation_25: RegExp;
        export { punctuation_25 as punctuation };
    }
    import po = gettext;
    export { po };
    export const git: {
        comment: RegExp;
        deleted: RegExp;
        inserted: RegExp;
        string: RegExp;
        command: {
            pattern: RegExp;
            inside: {
                parameter: RegExp;
            };
        };
        coord: RegExp;
        "commit-sha1": RegExp;
    };
    export const glsl: any;
    export const gn: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        "string-literal": {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            inside: {
                interpolation: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    inside: {
                        number: RegExp;
                        variable: RegExp;
                        "interpolation-punctuation": {
                            pattern: RegExp;
                            alias: string;
                        };
                        expression: {
                            pattern: RegExp;
                            inside: any;
                        };
                    };
                };
                string: RegExp;
            };
        };
        keyword: RegExp;
        boolean: RegExp;
        "builtin-function": {
            pattern: RegExp;
            alias: string;
        };
        function: RegExp;
        constant: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    import gni = gn;
    export { gni };
    const _linker_script: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        identifier: {
            pattern: RegExp;
            greedy: boolean;
        };
        "location-counter": {
            pattern: RegExp;
            alias: string;
        };
        section: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        function: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export { _linker_script as linker-script };
    export const ld: any;
    export const go: any;
    const _go_mod: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        version: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        "go-version": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        keyword: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        operator: RegExp;
        punctuation: RegExp;
    };
    export { _go_mod as go-mod };
    const _go_module: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        version: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        "go-version": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        keyword: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        operator: RegExp;
        punctuation: RegExp;
    };
    export { _go_module as go-module };
    export const graphql: {
        comment: RegExp;
        description: {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
            inside: {
                "language-markdown": {
                    pattern: RegExp;
                    lookbehind: boolean;
                    inside: any;
                };
            };
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        number: RegExp;
        boolean: RegExp;
        variable: RegExp;
        directive: {
            pattern: RegExp;
            alias: string;
        };
        "attr-name": {
            pattern: RegExp;
            greedy: boolean;
        };
        "atom-input": {
            pattern: RegExp;
            alias: string;
        };
        scalar: RegExp;
        constant: RegExp;
        "class-name": {
            pattern: RegExp;
            lookbehind: boolean;
        };
        fragment: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        "definition-mutation": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        "definition-query": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        keyword: RegExp;
        operator: RegExp;
        "property-query": RegExp;
        object: RegExp;
        punctuation: RegExp;
        property: RegExp;
    };
    export const haskell: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        char: {
            pattern: RegExp;
            alias: string;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        keyword: RegExp;
        "import-statement": {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                keyword: RegExp;
                punctuation: RegExp;
            };
        };
        builtin: RegExp;
        number: RegExp;
        operator: (RegExp | {
            pattern: RegExp;
            greedy: boolean;
            lookbehind?: undefined;
        } | {
            pattern: RegExp;
            lookbehind: boolean;
            greedy?: undefined;
        })[];
        hvariable: {
            pattern: RegExp;
            inside: {
                punctuation: RegExp;
            };
        };
        constant: {
            pattern: RegExp;
            inside: {
                punctuation: RegExp;
            };
        };
        punctuation: RegExp;
    };
    import hs = haskell;
    export { hs };
    export const haxe: any;
    export namespace hcl {
        const comment_21: RegExp;
        export { comment_21 as comment };
        export namespace heredoc {
            const pattern_62: RegExp;
            export { pattern_62 as pattern };
            const greedy_25: boolean;
            export { greedy_25 as greedy };
            const alias_22: string;
            export { alias_22 as alias };
        }
        const keyword_19: (RegExp | {
            pattern: RegExp;
            inside: {
                type: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    alias: string;
                };
            };
        })[];
        export { keyword_19 as keyword };
        const property_3: RegExp[];
        export { property_3 as property };
        export namespace string_19 {
            const pattern_63: RegExp;
            export { pattern_63 as pattern };
            const greedy_26: boolean;
            export { greedy_26 as greedy };
            export namespace inside_13 {
                export namespace interpolation_1 {
                    const pattern_64: RegExp;
                    export { pattern_64 as pattern };
                    const lookbehind_27: boolean;
                    export { lookbehind_27 as lookbehind };
                    export namespace inside_14 {
                        export namespace type_1 {
                            const pattern_65: RegExp;
                            export { pattern_65 as pattern };
                            const lookbehind_28: boolean;
                            export { lookbehind_28 as lookbehind };
                            const alias_23: string;
                            export { alias_23 as alias };
                        }
                        export { type_1 as type };
                        const keyword_20: RegExp;
                        export { keyword_20 as keyword };
                        const _function_12: RegExp;
                        export { _function_12 as function };
                        export namespace string_20 {
                            const pattern_66: RegExp;
                            export { pattern_66 as pattern };
                            const greedy_27: boolean;
                            export { greedy_27 as greedy };
                        }
                        export { string_20 as string };
                        const number_16: RegExp;
                        export { number_16 as number };
                        const punctuation_26: RegExp;
                        export { punctuation_26 as punctuation };
                    }
                    export { inside_14 as inside };
                }
                export { interpolation_1 as interpolation };
            }
            export { inside_13 as inside };
        }
        export { string_19 as string };
        const number_17: RegExp;
        export { number_17 as number };
        const boolean_10: RegExp;
        export { boolean_10 as boolean };
        const punctuation_27: RegExp;
        export { punctuation_27 as punctuation };
    }
    export const hlsl: any;
    export const hoon: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        constant: RegExp;
        "class-name": RegExp;
        function: RegExp;
        keyword: RegExp;
    };
    export namespace hpkp {
        export namespace directive_4 {
            const pattern_67: RegExp;
            export { pattern_67 as pattern };
            const alias_24: string;
            export { alias_24 as alias };
        }
        export { directive_4 as directive };
        const operator_17: RegExp;
        export { operator_17 as operator };
        const punctuation_28: RegExp;
        export { punctuation_28 as punctuation };
    }
    export namespace hsts {
        export namespace directive_5 {
            const pattern_68: RegExp;
            export { pattern_68 as pattern };
            const alias_25: string;
            export { alias_25 as alias };
        }
        export { directive_5 as directive };
        const operator_18: RegExp;
        export { operator_18 as operator };
        const punctuation_29: RegExp;
        export { punctuation_29 as punctuation };
    }
    export namespace ichigojam {
        const comment_22: RegExp;
        export { comment_22 as comment };
        export namespace string_21 {
            const pattern_69: RegExp;
            export { pattern_69 as pattern };
            const greedy_28: boolean;
            export { greedy_28 as greedy };
        }
        export { string_21 as string };
        const number_18: RegExp;
        export { number_18 as number };
        const keyword_21: RegExp;
        export { keyword_21 as keyword };
        const _function_13: RegExp;
        export { _function_13 as function };
        export const label: RegExp;
        const operator_19: RegExp;
        export { operator_19 as operator };
        const punctuation_30: RegExp;
        export { punctuation_30 as punctuation };
    }
    export const icon: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        number: RegExp;
        "builtin-keyword": {
            pattern: RegExp;
            alias: string;
        };
        directive: {
            pattern: RegExp;
            alias: string;
        };
        keyword: RegExp;
        function: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const idris: any;
    import idr = idris;
    export { idr };
    export namespace inform7 {
        namespace string {
            namespace inside {
                namespace substitution {
                    namespace inside {
                        import rest = Prism.languages.inform7;
                        export { rest };
                    }
                }
            }
        }
    }
    export namespace ini {
        export namespace comment_23 {
            const pattern_70: RegExp;
            export { pattern_70 as pattern };
            const lookbehind_29: boolean;
            export { lookbehind_29 as lookbehind };
        }
        export { comment_23 as comment };
        export namespace section_1 {
            const pattern_71: RegExp;
            export { pattern_71 as pattern };
            const lookbehind_30: boolean;
            export { lookbehind_30 as lookbehind };
            const inside_15: {
                "section-name": {
                    pattern: RegExp;
                    lookbehind: boolean;
                    alias: string;
                };
                punctuation: RegExp;
            };
            export { inside_15 as inside };
        }
        export { section_1 as section };
        export namespace key_1 {
            const pattern_72: RegExp;
            export { pattern_72 as pattern };
            const lookbehind_31: boolean;
            export { lookbehind_31 as lookbehind };
            const alias_26: string;
            export { alias_26 as alias };
        }
        export { key_1 as key };
        export namespace value_2 {
            const pattern_73: RegExp;
            export { pattern_73 as pattern };
            const lookbehind_32: boolean;
            export { lookbehind_32 as lookbehind };
            const alias_27: string;
            export { alias_27 as alias };
            const inside_16: {
                "inner-value": {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
            };
            export { inside_16 as inside };
        }
        export { value_2 as value };
        const punctuation_31: RegExp;
        export { punctuation_31 as punctuation };
    }
    export const io: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        "triple-quoted-string": {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        keyword: RegExp;
        builtin: RegExp;
        boolean: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export namespace j {
        export namespace comment_24 {
            const pattern_74: RegExp;
            export { pattern_74 as pattern };
            const greedy_29: boolean;
            export { greedy_29 as greedy };
        }
        export { comment_24 as comment };
        export namespace string_22 {
            const pattern_75: RegExp;
            export { pattern_75 as pattern };
            const greedy_30: boolean;
            export { greedy_30 as greedy };
        }
        export { string_22 as string };
        const keyword_22: RegExp;
        export { keyword_22 as keyword };
        export namespace verb {
            const pattern_76: RegExp;
            export { pattern_76 as pattern };
            const alias_28: string;
            export { alias_28 as alias };
        }
        const number_19: RegExp;
        export { number_19 as number };
        export namespace adverb {
            const pattern_77: RegExp;
            export { pattern_77 as pattern };
            const alias_29: string;
            export { alias_29 as alias };
        }
        const operator_20: RegExp;
        export { operator_20 as operator };
        export namespace conjunction {
            const pattern_78: RegExp;
            export { pattern_78 as pattern };
            const alias_30: string;
            export { alias_30 as alias };
        }
        const punctuation_32: RegExp;
        export { punctuation_32 as punctuation };
    }
    export const javastacktrace: {
        summary: {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                keyword: {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
                string: {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
                exceptions: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    inside: {
                        "class-name": RegExp;
                        namespace: RegExp;
                        punctuation: RegExp;
                    };
                };
                message: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    alias: string;
                };
                punctuation: RegExp;
            };
        };
        "stack-frame": {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                keyword: {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
                source: ({
                    pattern: RegExp;
                    lookbehind: boolean;
                    inside: {
                        file: RegExp;
                        punctuation: RegExp;
                        "line-number": {
                            pattern: RegExp;
                            alias: string;
                        };
                        keyword?: undefined;
                    };
                } | {
                    pattern: RegExp;
                    lookbehind: boolean;
                    inside: {
                        keyword: RegExp;
                        file?: undefined;
                        punctuation?: undefined;
                        "line-number"?: undefined;
                    };
                })[];
                "class-name": RegExp;
                function: RegExp;
                "class-loader": {
                    pattern: RegExp;
                    lookbehind: boolean;
                    alias: string;
                    inside: {
                        punctuation: RegExp;
                    };
                };
                module: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    inside: {
                        version: {
                            pattern: RegExp;
                            lookbehind: boolean;
                            alias: string;
                        };
                        punctuation: RegExp;
                    };
                };
                namespace: {
                    pattern: RegExp;
                    inside: {
                        punctuation: RegExp;
                    };
                };
                punctuation: RegExp;
            };
        };
        more: {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                punctuation: RegExp;
                number: RegExp;
                keyword: RegExp;
            };
        };
    };
    export namespace jexl {
        const string_23: RegExp;
        export { string_23 as string };
        export namespace transform {
            const pattern_79: RegExp;
            export { pattern_79 as pattern };
            const alias_31: string;
            export { alias_31 as alias };
            const lookbehind_33: boolean;
            export { lookbehind_33 as lookbehind };
        }
        const _function_14: RegExp;
        export { _function_14 as function };
        const number_20: RegExp;
        export { number_20 as number };
        const operator_21: RegExp;
        export { operator_21 as operator };
        const boolean_11: RegExp;
        export { boolean_11 as boolean };
        const keyword_23: RegExp;
        export { keyword_23 as keyword };
        const punctuation_33: RegExp;
        export { punctuation_33 as punctuation };
    }
    export const jolie: any;
    export namespace json {
        export namespace property_4 {
            const pattern_80: RegExp;
            export { pattern_80 as pattern };
            const lookbehind_34: boolean;
            export { lookbehind_34 as lookbehind };
            const greedy_31: boolean;
            export { greedy_31 as greedy };
        }
        export { property_4 as property };
        export namespace string_24 {
            const pattern_81: RegExp;
            export { pattern_81 as pattern };
            const lookbehind_35: boolean;
            export { lookbehind_35 as lookbehind };
            const greedy_32: boolean;
            export { greedy_32 as greedy };
        }
        export { string_24 as string };
        export namespace comment_25 {
            const pattern_82: RegExp;
            export { pattern_82 as pattern };
            const greedy_33: boolean;
            export { greedy_33 as greedy };
        }
        export { comment_25 as comment };
        const number_21: RegExp;
        export { number_21 as number };
        const punctuation_34: RegExp;
        export { punctuation_34 as punctuation };
        const operator_22: RegExp;
        export { operator_22 as operator };
        const boolean_12: RegExp;
        export { boolean_12 as boolean };
        export namespace _null {
            const pattern_83: RegExp;
            export { pattern_83 as pattern };
            const alias_32: string;
            export { alias_32 as alias };
        }
        export { _null as null };
    }
    import webmanifest = json;
    export { webmanifest };
    export const jsonp: any;
    export const jsstacktrace: {
        "error-message": {
            pattern: RegExp;
            alias: string;
        };
        "stack-frame": {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                "not-my-code": {
                    pattern: RegExp;
                    alias: string;
                };
                filename: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    alias: string;
                };
                function: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    inside: {
                        punctuation: RegExp;
                    };
                };
                punctuation: RegExp;
                keyword: RegExp;
                alias: {
                    pattern: RegExp;
                    alias: string;
                };
                "line-number": {
                    pattern: RegExp;
                    alias: string;
                    inside: {
                        punctuation: RegExp;
                    };
                };
            };
        };
    };
    export namespace julia {
        export namespace comment_26 {
            const pattern_84: RegExp;
            export { pattern_84 as pattern };
            const lookbehind_36: boolean;
            export { lookbehind_36 as lookbehind };
        }
        export { comment_26 as comment };
        export namespace regex_2 {
            const pattern_85: RegExp;
            export { pattern_85 as pattern };
            const greedy_34: boolean;
            export { greedy_34 as greedy };
        }
        export { regex_2 as regex };
        export namespace string_25 {
            const pattern_86: RegExp;
            export { pattern_86 as pattern };
            const greedy_35: boolean;
            export { greedy_35 as greedy };
        }
        export { string_25 as string };
        export namespace char_2 {
            const pattern_87: RegExp;
            export { pattern_87 as pattern };
            const lookbehind_37: boolean;
            export { lookbehind_37 as lookbehind };
            const greedy_36: boolean;
            export { greedy_36 as greedy };
        }
        export { char_2 as char };
        const keyword_24: RegExp;
        export { keyword_24 as keyword };
        const boolean_13: RegExp;
        export { boolean_13 as boolean };
        const number_22: RegExp;
        export { number_22 as number };
        const operator_23: RegExp;
        export { operator_23 as operator };
        const punctuation_35: RegExp;
        export { punctuation_35 as punctuation };
        const constant_2: RegExp;
        export { constant_2 as constant };
    }
    export const keepalived: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        ip: {
            pattern: RegExp;
            alias: string;
        };
        path: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        variable: RegExp;
        email: {
            pattern: RegExp;
            alias: string;
        };
        "conditional-configuration": {
            pattern: RegExp;
            alias: string;
        };
        operator: RegExp;
        property: RegExp;
        constant: RegExp;
        number: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        boolean: RegExp;
        punctuation: RegExp;
    };
    export const keyman: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        "virtual-key": {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
        };
        "header-keyword": {
            pattern: RegExp;
            alias: string;
        };
        "header-statement": {
            pattern: RegExp;
            alias: string;
        };
        "rule-keyword": {
            pattern: RegExp;
            alias: string;
        };
        "structural-keyword": {
            pattern: RegExp;
            alias: string;
        };
        "compile-target": {
            pattern: RegExp;
            alias: string;
        };
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const kusto: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        verb: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        command: {
            pattern: RegExp;
            alias: string;
        };
        "class-name": RegExp;
        keyword: RegExp;
        boolean: RegExp;
        function: RegExp;
        datetime: {
            pattern: RegExp;
            alias: string;
        }[];
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const less: any;
    export namespace liquid {
        export namespace comment_27 {
            const pattern_88: RegExp;
            export { pattern_88 as pattern };
            const lookbehind_38: boolean;
            export { lookbehind_38 as lookbehind };
        }
        export { comment_27 as comment };
        export namespace delimiter {
            const pattern_89: RegExp;
            export { pattern_89 as pattern };
            const alias_33: string;
            export { alias_33 as alias };
        }
        export namespace string_26 {
            const pattern_90: RegExp;
            export { pattern_90 as pattern };
            const greedy_37: boolean;
            export { greedy_37 as greedy };
        }
        export { string_26 as string };
        const keyword_25: RegExp;
        export { keyword_25 as keyword };
        export const object: RegExp;
        const _function_15: ({
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        } | {
            pattern: RegExp;
            lookbehind: boolean;
            alias?: undefined;
        })[];
        export { _function_15 as function };
        const boolean_14: RegExp;
        export { boolean_14 as boolean };
        export namespace range_1 {
            const pattern_91: RegExp;
            export { pattern_91 as pattern };
            const alias_34: string;
            export { alias_34 as alias };
        }
        export { range_1 as range };
        const number_23: RegExp;
        export { number_23 as number };
        const operator_24: RegExp;
        export { operator_24 as operator };
        const punctuation_36: RegExp;
        export { punctuation_36 as punctuation };
        export namespace empty {
            const pattern_92: RegExp;
            export { pattern_92 as pattern };
            const alias_35: string;
            export { alias_35 as alias };
        }
    }
    export const livescript: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
        }[];
        "interpolated-string": {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            inside: {
                variable: {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
                interpolation: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    inside: {
                        "interpolation-punctuation": {
                            pattern: RegExp;
                            alias: string;
                        };
                    };
                };
                string: RegExp;
            };
        };
        string: (RegExp | {
            pattern: RegExp;
            greedy: boolean;
        })[];
        regex: ({
            pattern: RegExp;
            greedy: boolean;
            inside: {
                comment: {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
            };
        } | {
            pattern: RegExp;
            greedy: boolean;
            inside?: undefined;
        })[];
        keyword: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        "keyword-operator": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        boolean: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        argument: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        number: RegExp;
        identifier: RegExp;
        operator: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        punctuation: RegExp;
    };
    export const log: {
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        exception: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            alias: string[];
            inside: any;
        };
        level: {
            pattern: RegExp;
            alias: string[];
        }[];
        property: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        separator: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        url: RegExp;
        email: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        "ip-address": {
            pattern: RegExp;
            alias: string;
        };
        "mac-address": {
            pattern: RegExp;
            alias: string;
        };
        domain: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        uuid: {
            pattern: RegExp;
            alias: string;
        };
        hash: {
            pattern: RegExp;
            alias: string;
        };
        "file-path": {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            alias: string;
        };
        date: {
            pattern: RegExp;
            alias: string;
        };
        time: {
            pattern: RegExp;
            alias: string;
        };
        boolean: RegExp;
        number: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        operator: RegExp;
        punctuation: RegExp;
    };
    export namespace lolcode {
        const comment_28: RegExp[];
        export { comment_28 as comment };
        export namespace string_27 {
            const pattern_93: RegExp;
            export { pattern_93 as pattern };
            export namespace inside_17 {
                const variable_11: RegExp;
                export { variable_11 as variable };
                const symbol_2: RegExp[];
                export { symbol_2 as symbol };
            }
            export { inside_17 as inside };
            const greedy_38: boolean;
            export { greedy_38 as greedy };
        }
        export { string_27 as string };
        const number_24: RegExp;
        export { number_24 as number };
        export namespace symbol_3 {
            const pattern_94: RegExp;
            export { pattern_94 as pattern };
            const lookbehind_39: boolean;
            export { lookbehind_39 as lookbehind };
            export namespace inside_18 {
                const keyword_26: RegExp;
                export { keyword_26 as keyword };
            }
            export { inside_18 as inside };
        }
        export { symbol_3 as symbol };
        export namespace label_1 {
            const pattern_95: RegExp;
            export { pattern_95 as pattern };
            const lookbehind_40: boolean;
            export { lookbehind_40 as lookbehind };
            const alias_36: string;
            export { alias_36 as alias };
        }
        export { label_1 as label };
        export namespace _function_16 {
            const pattern_96: RegExp;
            export { pattern_96 as pattern };
            const lookbehind_41: boolean;
            export { lookbehind_41 as lookbehind };
        }
        export { _function_16 as function };
        const keyword_27: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        export { keyword_27 as keyword };
        export namespace boolean_15 {
            const pattern_97: RegExp;
            export { pattern_97 as pattern };
            const lookbehind_42: boolean;
            export { lookbehind_42 as lookbehind };
        }
        export { boolean_15 as boolean };
        export namespace variable_12 {
            const pattern_98: RegExp;
            export { pattern_98 as pattern };
            const lookbehind_43: boolean;
            export { lookbehind_43 as lookbehind };
        }
        export { variable_12 as variable };
        export namespace operator_25 {
            const pattern_99: RegExp;
            export { pattern_99 as pattern };
            const lookbehind_44: boolean;
            export { lookbehind_44 as lookbehind };
        }
        export { operator_25 as operator };
        const punctuation_37: RegExp;
        export { punctuation_37 as punctuation };
    }
    export namespace magma {
        export namespace output {
            const pattern_100: RegExp;
            export { pattern_100 as pattern };
            const lookbehind_45: boolean;
            export { lookbehind_45 as lookbehind };
            const greedy_39: boolean;
            export { greedy_39 as greedy };
        }
        export namespace comment_29 {
            const pattern_101: RegExp;
            export { pattern_101 as pattern };
            const greedy_40: boolean;
            export { greedy_40 as greedy };
        }
        export { comment_29 as comment };
        export namespace string_28 {
            const pattern_102: RegExp;
            export { pattern_102 as pattern };
            const lookbehind_46: boolean;
            export { lookbehind_46 as lookbehind };
            const greedy_41: boolean;
            export { greedy_41 as greedy };
        }
        export { string_28 as string };
        const keyword_28: RegExp;
        export { keyword_28 as keyword };
        const boolean_16: RegExp;
        export { boolean_16 as boolean };
        export namespace generator {
            const pattern_103: RegExp;
            export { pattern_103 as pattern };
            const alias_37: string;
            export { alias_37 as alias };
        }
        const _function_17: RegExp;
        export { _function_17 as function };
        export namespace number_25 {
            const pattern_104: RegExp;
            export { pattern_104 as pattern };
            const lookbehind_47: boolean;
            export { lookbehind_47 as lookbehind };
        }
        export { number_25 as number };
        const operator_26: RegExp;
        export { operator_26 as operator };
        const punctuation_38: RegExp;
        export { punctuation_38 as punctuation };
    }
    export const makefile: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        "builtin-target": {
            pattern: RegExp;
            alias: string;
        };
        target: {
            pattern: RegExp;
            alias: string;
            inside: {
                variable: RegExp;
            };
        };
        variable: RegExp;
        keyword: RegExp;
        function: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        operator: RegExp;
        punctuation: RegExp;
    };
    export namespace matlab {
        const comment_30: RegExp[];
        export { comment_30 as comment };
        export namespace string_29 {
            const pattern_105: RegExp;
            export { pattern_105 as pattern };
            const greedy_42: boolean;
            export { greedy_42 as greedy };
        }
        export { string_29 as string };
        const number_26: RegExp;
        export { number_26 as number };
        const keyword_29: RegExp;
        export { keyword_29 as keyword };
        const _function_18: RegExp;
        export { _function_18 as function };
        const operator_27: RegExp;
        export { operator_27 as operator };
        const punctuation_39: RegExp;
        export { punctuation_39 as punctuation };
    }
    export const mel: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        code: {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
            inside: {
                delimiter: {
                    pattern: RegExp;
                    alias: string;
                };
                statement: {
                    pattern: RegExp;
                    inside: any;
                };
            };
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        variable: RegExp;
        number: RegExp;
        flag: {
            pattern: RegExp;
            alias: string;
        };
        keyword: RegExp;
        function: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        "tensor-punctuation": {
            pattern: RegExp;
            alias: string;
        };
        operator: RegExp;
        punctuation: RegExp;
    };
    export const mermaid: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        style: {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                property: RegExp;
                operator: RegExp;
                punctuation: RegExp;
            };
        };
        "inter-arrow-label": {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            inside: {
                arrow: {
                    pattern: RegExp;
                    alias: string;
                };
                label: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    alias: string;
                };
                "arrow-head": {
                    pattern: RegExp;
                    alias: string[];
                };
            };
        };
        arrow: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        }[];
        label: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            alias: string;
        };
        text: {
            pattern: RegExp;
            alias: string;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        annotation: {
            pattern: RegExp;
            alias: string;
        };
        keyword: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        }[];
        entity: RegExp;
        operator: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        punctuation: RegExp;
    };
    export namespace metafont {
        export namespace comment_31 {
            const pattern_106: RegExp;
            export { pattern_106 as pattern };
            const greedy_43: boolean;
            export { greedy_43 as greedy };
        }
        export { comment_31 as comment };
        export namespace string_30 {
            const pattern_107: RegExp;
            export { pattern_107 as pattern };
            const greedy_44: boolean;
            export { greedy_44 as greedy };
        }
        export { string_30 as string };
        const number_27: RegExp;
        export { number_27 as number };
        const boolean_17: RegExp;
        export { boolean_17 as boolean };
        const punctuation_40: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        export { punctuation_40 as punctuation };
        const constant_3: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        export { constant_3 as constant };
        export namespace quantity {
            const pattern_108: RegExp;
            export { pattern_108 as pattern };
            const alias_38: string;
            export { alias_38 as alias };
        }
        export namespace command_1 {
            const pattern_109: RegExp;
            export { pattern_109 as pattern };
            const alias_39: string;
            export { alias_39 as alias };
        }
        export { command_1 as command };
        const operator_28: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        export { operator_28 as operator };
        export namespace macro {
            const pattern_110: RegExp;
            export { pattern_110 as pattern };
            const alias_40: string;
            export { alias_40 as alias };
        }
        const builtin_2: RegExp;
        export { builtin_2 as builtin };
        const keyword_30: RegExp;
        export { keyword_30 as keyword };
        export namespace type_2 {
            const pattern_111: RegExp;
            export { pattern_111 as pattern };
            const alias_41: string;
            export { alias_41 as alias };
        }
        export { type_2 as type };
        export namespace variable_13 {
            const pattern_112: RegExp;
            export { pattern_112 as pattern };
            const lookbehind_48: boolean;
            export { lookbehind_48 as lookbehind };
        }
        export { variable_13 as variable };
    }
    export namespace mizar {
        const comment_32: RegExp;
        export { comment_32 as comment };
        const keyword_31: RegExp;
        export { keyword_31 as keyword };
        export namespace parameter {
            const pattern_113: RegExp;
            export { pattern_113 as pattern };
            const alias_42: string;
            export { alias_42 as alias };
        }
        const variable_14: RegExp;
        export { variable_14 as variable };
        const number_28: RegExp;
        export { number_28 as number };
        const operator_29: RegExp;
        export { operator_29 as operator };
        const punctuation_41: RegExp;
        export { punctuation_41 as punctuation };
    }
    export const monkey: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        preprocessor: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            alias: string;
        };
        function: RegExp;
        "type-char": {
            pattern: RegExp;
            alias: string;
        };
        number: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        keyword: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const moonscript: {
        comment: RegExp;
        string: ({
            pattern: RegExp;
            greedy: boolean;
            inside?: undefined;
        } | {
            pattern: RegExp;
            greedy: boolean;
            inside: {
                interpolation: {
                    pattern: RegExp;
                    inside: {
                        moonscript: {
                            pattern: RegExp;
                            lookbehind: boolean;
                            inside: any;
                        };
                        "interpolation-punctuation": {
                            pattern: RegExp;
                            alias: string;
                        };
                    };
                };
            };
        })[];
        "class-name": (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        keyword: RegExp;
        variable: RegExp;
        property: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        function: {
            pattern: RegExp;
            inside: {
                punctuation: RegExp;
            };
        };
        boolean: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    import moon = moonscript;
    export { moon };
    export namespace n1ql {
        export namespace comment_33 {
            const pattern_114: RegExp;
            export { pattern_114 as pattern };
            const greedy_45: boolean;
            export { greedy_45 as greedy };
        }
        export { comment_33 as comment };
        export namespace string_31 {
            const pattern_115: RegExp;
            export { pattern_115 as pattern };
            const greedy_46: boolean;
            export { greedy_46 as greedy };
        }
        export { string_31 as string };
        export namespace identifier_2 {
            const pattern_116: RegExp;
            export { pattern_116 as pattern };
            const greedy_47: boolean;
            export { greedy_47 as greedy };
        }
        export { identifier_2 as identifier };
        const parameter_1: RegExp;
        export { parameter_1 as parameter };
        const keyword_32: RegExp;
        export { keyword_32 as keyword };
        const _function_19: RegExp;
        export { _function_19 as function };
        const boolean_18: RegExp;
        export { boolean_18 as boolean };
        const number_29: RegExp;
        export { number_29 as number };
        const operator_30: RegExp;
        export { operator_30 as operator };
        const punctuation_42: RegExp;
        export { punctuation_42 as punctuation };
    }
    export const n4js: any;
    import n4jsd = n4js;
    export { n4jsd };
    export namespace _nand2tetris_hdl {
        const comment_34: RegExp;
        export { comment_34 as comment };
        const keyword_33: RegExp;
        export { keyword_33 as keyword };
        const boolean_19: RegExp;
        export { boolean_19 as boolean };
        const _function_20: RegExp;
        export { _function_20 as function };
        const number_30: RegExp;
        export { number_30 as number };
        const operator_31: RegExp;
        export { operator_31 as operator };
        const punctuation_43: RegExp;
        export { punctuation_43 as punctuation };
    }
    export { _nand2tetris_hdl as nand2tetris-hdl };
    export namespace nasm {
        const comment_35: RegExp;
        export { comment_35 as comment };
        const string_32: RegExp;
        export { string_32 as string };
        export namespace label_2 {
            const pattern_117: RegExp;
            export { pattern_117 as pattern };
            const lookbehind_49: boolean;
            export { lookbehind_49 as lookbehind };
            const alias_43: string;
            export { alias_43 as alias };
        }
        export { label_2 as label };
        const keyword_34: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        export { keyword_34 as keyword };
        export namespace register {
            const pattern_118: RegExp;
            export { pattern_118 as pattern };
            const alias_44: string;
            export { alias_44 as alias };
        }
        const number_31: RegExp;
        export { number_31 as number };
        const operator_32: RegExp;
        export { operator_32 as operator };
    }
    export namespace neon {
        export namespace comment_36 {
            const pattern_119: RegExp;
            export { pattern_119 as pattern };
            const greedy_48: boolean;
            export { greedy_48 as greedy };
        }
        export { comment_36 as comment };
        export namespace datetime {
            const pattern_120: RegExp;
            export { pattern_120 as pattern };
            const lookbehind_50: boolean;
            export { lookbehind_50 as lookbehind };
            const alias_45: string;
            export { alias_45 as alias };
        }
        export namespace key_2 {
            const pattern_121: RegExp;
            export { pattern_121 as pattern };
            const lookbehind_51: boolean;
            export { lookbehind_51 as lookbehind };
            const alias_46: string;
            export { alias_46 as alias };
        }
        export { key_2 as key };
        export namespace number_32 {
            const pattern_122: RegExp;
            export { pattern_122 as pattern };
            const lookbehind_52: boolean;
            export { lookbehind_52 as lookbehind };
        }
        export { number_32 as number };
        export namespace boolean_20 {
            const pattern_123: RegExp;
            export { pattern_123 as pattern };
            const lookbehind_53: boolean;
            export { lookbehind_53 as lookbehind };
        }
        export { boolean_20 as boolean };
        export namespace _null_1 {
            const pattern_124: RegExp;
            export { pattern_124 as pattern };
            const lookbehind_54: boolean;
            export { lookbehind_54 as lookbehind };
            const alias_47: string;
            export { alias_47 as alias };
        }
        export { _null_1 as null };
        export namespace string_33 {
            const pattern_125: RegExp;
            export { pattern_125 as pattern };
            const lookbehind_55: boolean;
            export { lookbehind_55 as lookbehind };
            const greedy_49: boolean;
            export { greedy_49 as greedy };
        }
        export { string_33 as string };
        export namespace literal {
            const pattern_126: RegExp;
            export { pattern_126 as pattern };
            const lookbehind_56: boolean;
            export { lookbehind_56 as lookbehind };
            const alias_48: string;
            export { alias_48 as alias };
        }
        const punctuation_44: RegExp;
        export { punctuation_44 as punctuation };
    }
    export const nevod: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
            inside: {
                "string-attrs": RegExp;
            };
        };
        namespace: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        pattern: {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                "pattern-name": {
                    pattern: RegExp;
                    alias: string;
                };
                fields: {
                    pattern: RegExp;
                    inside: {
                        "field-name": {
                            pattern: RegExp;
                            alias: string;
                        };
                        punctuation: RegExp;
                        operator: {
                            pattern: RegExp;
                            alias: string;
                        };
                    };
                };
            };
        };
        search: {
            pattern: RegExp;
            alias: string;
            lookbehind: boolean;
        };
        keyword: RegExp;
        "standard-pattern": {
            pattern: RegExp;
            inside: {
                "standard-pattern-name": {
                    pattern: RegExp;
                    alias: string;
                };
                quantifier: {
                    pattern: RegExp;
                    alias: string;
                };
                "standard-pattern-attr": {
                    pattern: RegExp;
                    alias: string;
                };
                punctuation: RegExp;
            };
        };
        quantifier: {
            pattern: RegExp;
            alias: string;
        };
        operator: {
            pattern: RegExp;
            alias: string;
        }[];
        "field-capture": ({
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                "field-name": {
                    pattern: RegExp;
                    alias: string;
                };
                colon: RegExp;
            };
        } | {
            pattern: RegExp;
            inside: {
                "field-name": {
                    pattern: RegExp;
                    alias: string;
                };
                colon: RegExp;
            };
            lookbehind?: undefined;
        })[];
        punctuation: RegExp;
        name: RegExp;
    };
    export namespace nim {
        export namespace comment_37 {
            const pattern_127: RegExp;
            export { pattern_127 as pattern };
            const greedy_50: boolean;
            export { greedy_50 as greedy };
        }
        export { comment_37 as comment };
        export namespace string_34 {
            const pattern_128: RegExp;
            export { pattern_128 as pattern };
            const greedy_51: boolean;
            export { greedy_51 as greedy };
        }
        export { string_34 as string };
        export namespace char_3 {
            const pattern_129: RegExp;
            export { pattern_129 as pattern };
            const greedy_52: boolean;
            export { greedy_52 as greedy };
        }
        export { char_3 as char };
        export namespace _function_21 {
            const pattern_130: RegExp;
            export { pattern_130 as pattern };
            const greedy_53: boolean;
            export { greedy_53 as greedy };
            export namespace inside_19 {
                const operator_33: RegExp;
                export { operator_33 as operator };
            }
            export { inside_19 as inside };
        }
        export { _function_21 as function };
        export namespace identifier_3 {
            const pattern_131: RegExp;
            export { pattern_131 as pattern };
            const greedy_54: boolean;
            export { greedy_54 as greedy };
            export namespace inside_20 {
                const punctuation_45: RegExp;
                export { punctuation_45 as punctuation };
            }
            export { inside_20 as inside };
        }
        export { identifier_3 as identifier };
        const number_33: RegExp;
        export { number_33 as number };
        const keyword_35: RegExp;
        export { keyword_35 as keyword };
        export namespace operator_34 {
            const pattern_132: RegExp;
            export { pattern_132 as pattern };
            const lookbehind_57: boolean;
            export { lookbehind_57 as lookbehind };
        }
        export { operator_34 as operator };
        const punctuation_46: RegExp;
        export { punctuation_46 as punctuation };
    }
    export namespace nix {
        namespace string {
            namespace inside {
                namespace interpolation {
                    import inside_21 = Prism.languages.nix;
                    export { inside_21 as inside };
                }
            }
        }
    }
    export namespace nsis {
        export namespace comment_38 {
            const pattern_133: RegExp;
            export { pattern_133 as pattern };
            const lookbehind_58: boolean;
            export { lookbehind_58 as lookbehind };
            const greedy_55: boolean;
            export { greedy_55 as greedy };
        }
        export { comment_38 as comment };
        export namespace string_35 {
            const pattern_134: RegExp;
            export { pattern_134 as pattern };
            const greedy_56: boolean;
            export { greedy_56 as greedy };
        }
        export { string_35 as string };
        export namespace keyword_36 {
            const pattern_135: RegExp;
            export { pattern_135 as pattern };
            const lookbehind_59: boolean;
            export { lookbehind_59 as lookbehind };
        }
        export { keyword_36 as keyword };
        const property_5: RegExp;
        export { property_5 as property };
        const constant_4: RegExp;
        export { constant_4 as constant };
        const variable_15: RegExp;
        export { variable_15 as variable };
        const number_34: RegExp;
        export { number_34 as number };
        const operator_35: RegExp;
        export { operator_35 as operator };
        const punctuation_47: RegExp;
        export { punctuation_47 as punctuation };
        export namespace important {
            const pattern_136: RegExp;
            export { pattern_136 as pattern };
            const lookbehind_60: boolean;
            export { lookbehind_60 as lookbehind };
        }
    }
    export const objectivec: any;
    import objc = objectivec;
    export { objc };
    export const ocaml: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        char: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        }[];
        number: RegExp[];
        directive: {
            pattern: RegExp;
            alias: string;
        };
        label: {
            pattern: RegExp;
            alias: string;
        };
        "type-variable": {
            pattern: RegExp;
            alias: string;
        };
        variant: {
            pattern: RegExp;
            alias: string;
        };
        keyword: RegExp;
        boolean: RegExp;
        "operator-like-punctuation": {
            pattern: RegExp;
            alias: string;
        };
        operator: RegExp;
        punctuation: RegExp;
    };
    export const openqasm: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        keyword: RegExp;
        "class-name": RegExp;
        function: RegExp;
        constant: RegExp;
        number: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        operator: RegExp;
        punctuation: RegExp;
    };
    import qasm = openqasm;
    export { qasm };
    export const oz: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        atom: {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
        };
        keyword: RegExp;
        function: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        number: RegExp;
        variable: RegExp;
        "attr-name": RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export namespace parigp {
        const comment_39: RegExp;
        export { comment_39 as comment };
        export namespace string_36 {
            const pattern_137: RegExp;
            export { pattern_137 as pattern };
            const greedy_57: boolean;
            export { greedy_57 as greedy };
        }
        export { string_36 as string };
        const keyword_37: RegExp;
        export { keyword_37 as keyword };
        const _function_22: RegExp;
        export { _function_22 as function };
        export namespace number_35 {
            const pattern_138: RegExp;
            export { pattern_138 as pattern };
            const lookbehind_61: boolean;
            export { lookbehind_61 as lookbehind };
        }
        export { number_35 as number };
        const operator_36: RegExp;
        export { operator_36 as operator };
        const punctuation_48: RegExp;
        export { punctuation_48 as punctuation };
    }
    export namespace pascal {
        namespace asm {
            const inside_22: any;
            export { inside_22 as inside };
        }
    }
    import objectpascal = pascal;
    export { objectpascal };
    export const psl: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
            inside: {
                symbol: RegExp;
            };
        };
        "heredoc-string": {
            pattern: RegExp;
            alias: string;
            greedy: boolean;
        };
        keyword: RegExp;
        constant: RegExp;
        boolean: RegExp;
        variable: RegExp;
        builtin: {
            pattern: RegExp;
            alias: string;
        };
        "foreach-variable": {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        function: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export namespace pcaxis {
        const string_37: RegExp;
        export { string_37 as string };
        export namespace keyword_38 {
            const pattern_139: RegExp;
            export { pattern_139 as pattern };
            const lookbehind_62: boolean;
            export { lookbehind_62 as lookbehind };
            const greedy_58: boolean;
            export { greedy_58 as greedy };
            const inside_23: {
                keyword: RegExp;
                language: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    inside: {
                        punctuation: RegExp;
                        property: RegExp;
                    };
                };
                "sub-key": {
                    pattern: RegExp;
                    lookbehind: boolean;
                    inside: {
                        parameter: {
                            pattern: RegExp;
                            alias: string;
                        };
                        punctuation: RegExp;
                    };
                };
            };
            export { inside_23 as inside };
        }
        export { keyword_38 as keyword };
        const operator_37: RegExp;
        export { operator_37 as operator };
        export namespace tlist {
            const pattern_140: RegExp;
            export { pattern_140 as pattern };
            const greedy_59: boolean;
            export { greedy_59 as greedy };
            export namespace inside_24 {
                const _function_23: RegExp;
                export { _function_23 as function };
                export namespace property_6 {
                    const pattern_141: RegExp;
                    export { pattern_141 as pattern };
                    const lookbehind_63: boolean;
                    export { lookbehind_63 as lookbehind };
                }
                export { property_6 as property };
                const string_38: RegExp;
                export { string_38 as string };
                const punctuation_49: RegExp;
                export { punctuation_49 as punctuation };
                const operator_38: RegExp;
                export { operator_38 as operator };
            }
            export { inside_24 as inside };
        }
        const punctuation_50: RegExp;
        export { punctuation_50 as punctuation };
        export namespace number_36 {
            const pattern_142: RegExp;
            export { pattern_142 as pattern };
            const lookbehind_64: boolean;
            export { lookbehind_64 as lookbehind };
        }
        export { number_36 as number };
        const boolean_21: RegExp;
        export { boolean_21 as boolean };
    }
    import px = pcaxis;
    export { px };
    export const peoplecode: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        variable: RegExp;
        "function-definition": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        "class-name": {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                punctuation: RegExp;
            };
        };
        keyword: RegExp;
        "operator-keyword": {
            pattern: RegExp;
            alias: string;
        };
        function: RegExp;
        boolean: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    import pcode = peoplecode;
    export { pcode };
    export const plsql: any;
    export const powerquery: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        "quoted-identifier": {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        constant: RegExp[];
        boolean: RegExp;
        keyword: RegExp;
        function: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        "data-type": {
            pattern: RegExp;
            alias: string;
        };
        number: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        operator: RegExp;
        punctuation: RegExp;
    };
    import pq = powerquery;
    export { pq };
    import mscript = powerquery;
    export { mscript };
    export const processing: any;
    export namespace prolog {
        export namespace comment_40 {
            const pattern_143: RegExp;
            export { pattern_143 as pattern };
            const greedy_60: boolean;
            export { greedy_60 as greedy };
        }
        export { comment_40 as comment };
        export namespace string_39 {
            const pattern_144: RegExp;
            export { pattern_144 as pattern };
            const greedy_61: boolean;
            export { greedy_61 as greedy };
        }
        export { string_39 as string };
        const builtin_3: RegExp;
        export { builtin_3 as builtin };
        const _function_24: RegExp;
        export { _function_24 as function };
        const number_37: RegExp;
        export { number_37 as number };
        const operator_39: RegExp;
        export { operator_39 as operator };
        const punctuation_51: RegExp;
        export { punctuation_51 as punctuation };
    }
    export namespace properties {
        const comment_41: RegExp;
        export { comment_41 as comment };
        export namespace value_3 {
            const pattern_145: RegExp;
            export { pattern_145 as pattern };
            const lookbehind_65: boolean;
            export { lookbehind_65 as lookbehind };
            const alias_49: string;
            export { alias_49 as alias };
        }
        export { value_3 as value };
        export namespace key_3 {
            const pattern_146: RegExp;
            export { pattern_146 as pattern };
            const alias_50: string;
            export { alias_50 as alias };
        }
        export { key_3 as key };
        const punctuation_52: RegExp;
        export { punctuation_52 as punctuation };
    }
    export const purebasic: any;
    import pbfasm = purebasic;
    export { pbfasm };
    export const purescript: any;
    import purs = purescript;
    export { purs };
    export const python: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        "string-interpolation": {
            pattern: RegExp;
            greedy: boolean;
            inside: {
                interpolation: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    inside: {
                        "format-spec": {
                            pattern: RegExp;
                            lookbehind: boolean;
                        };
                        "conversion-option": {
                            pattern: RegExp;
                            alias: string;
                        };
                        rest: any;
                    };
                };
                string: RegExp;
            };
        };
        "triple-quoted-string": {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        function: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        "class-name": {
            pattern: RegExp;
            lookbehind: boolean;
        };
        decorator: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string[];
            inside: {
                punctuation: RegExp;
            };
        };
        keyword: RegExp;
        builtin: RegExp;
        boolean: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    import py = python;
    export { py };
    export const qs: any;
    export namespace q {
        const string_40: RegExp;
        export { string_40 as string };
        const comment_42: ({
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        } | {
            pattern: RegExp;
            greedy: boolean;
            lookbehind?: undefined;
        })[];
        export { comment_42 as comment };
        const symbol_4: RegExp;
        export { symbol_4 as symbol };
        export namespace datetime_1 {
            const pattern_147: RegExp;
            export { pattern_147 as pattern };
            const alias_51: string;
            export { alias_51 as alias };
        }
        export { datetime_1 as datetime };
        const number_38: RegExp;
        export { number_38 as number };
        const keyword_39: RegExp;
        export { keyword_39 as keyword };
        export namespace adverb_1 {
            const pattern_148: RegExp;
            export { pattern_148 as pattern };
            const alias_52: string;
            export { alias_52 as alias };
        }
        export { adverb_1 as adverb };
        export namespace verb_1 {
            const pattern_149: RegExp;
            export { pattern_149 as pattern };
            const alias_53: string;
            export { alias_53 as alias };
        }
        export { verb_1 as verb };
        const punctuation_53: RegExp;
        export { punctuation_53 as punctuation };
    }
    export const qore: any;
    export const r: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        "percent-operator": {
            pattern: RegExp;
            alias: string;
        };
        boolean: RegExp;
        ellipsis: RegExp;
        number: RegExp[];
        keyword: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const racket: any;
    import rkt = racket;
    export { rkt };
    export const reason: any;
    export namespace rego {
        const comment_43: RegExp;
        export { comment_43 as comment };
        export namespace property_7 {
            const pattern_150: RegExp;
            export { pattern_150 as pattern };
            const lookbehind_66: boolean;
            export { lookbehind_66 as lookbehind };
            const greedy_62: boolean;
            export { greedy_62 as greedy };
        }
        export { property_7 as property };
        export namespace string_41 {
            const pattern_151: RegExp;
            export { pattern_151 as pattern };
            const lookbehind_67: boolean;
            export { lookbehind_67 as lookbehind };
            const greedy_63: boolean;
            export { greedy_63 as greedy };
        }
        export { string_41 as string };
        const keyword_40: RegExp;
        export { keyword_40 as keyword };
        const boolean_22: RegExp;
        export { boolean_22 as boolean };
        export namespace _function_25 {
            const pattern_152: RegExp;
            export { pattern_152 as pattern };
            export namespace inside_25 {
                const namespace_1: RegExp;
                export { namespace_1 as namespace };
                const punctuation_54: RegExp;
                export { punctuation_54 as punctuation };
            }
            export { inside_25 as inside };
        }
        export { _function_25 as function };
        const number_39: RegExp;
        export { number_39 as number };
        const operator_40: RegExp;
        export { operator_40 as operator };
        const punctuation_55: RegExp;
        export { punctuation_55 as punctuation };
    }
    export namespace renpy {
        export namespace comment_44 {
            const pattern_153: RegExp;
            export { pattern_153 as pattern };
            const lookbehind_68: boolean;
            export { lookbehind_68 as lookbehind };
        }
        export { comment_44 as comment };
        export namespace string_42 {
            const pattern_154: RegExp;
            export { pattern_154 as pattern };
            const greedy_64: boolean;
            export { greedy_64 as greedy };
        }
        export { string_42 as string };
        const _function_26: RegExp;
        export { _function_26 as function };
        const property_8: RegExp;
        export { property_8 as property };
        const tag_2: RegExp;
        export { tag_2 as tag };
        const keyword_41: RegExp;
        export { keyword_41 as keyword };
        const boolean_23: RegExp;
        export { boolean_23 as boolean };
        const number_40: RegExp;
        export { number_40 as number };
        const operator_41: RegExp;
        export { operator_41 as operator };
        const punctuation_56: RegExp;
        export { punctuation_56 as punctuation };
    }
    import rpy = renpy;
    export { rpy };
    export const rescript: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        char: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        "class-name": RegExp;
        function: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        number: RegExp;
        boolean: RegExp;
        "attr-value": RegExp;
        constant: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        tag: {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                operator: RegExp;
            };
        };
        keyword: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    import res = rescript;
    export { res };
    const rest_1: {
        table: {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                punctuation: RegExp;
            };
        }[];
        "substitution-def": {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                substitution: {
                    pattern: RegExp;
                    alias: string;
                    inside: {
                        punctuation: RegExp;
                    };
                };
                directive: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    alias: string;
                    inside: {
                        punctuation: RegExp;
                    };
                };
            };
        };
        "link-target": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
            inside: {
                punctuation: RegExp;
            };
        }[];
        directive: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
            inside: {
                punctuation: RegExp;
            };
        };
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        title: ({
            pattern: RegExp;
            inside: {
                punctuation: RegExp;
                important: RegExp;
            };
            lookbehind?: undefined;
        } | {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                punctuation: RegExp;
                important: RegExp;
            };
        })[];
        hr: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        field: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        "command-line-option": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        "literal-block": {
            pattern: RegExp;
            inside: {
                "literal-block-punctuation": {
                    pattern: RegExp;
                    alias: string;
                };
            };
        };
        "quoted-literal-block": {
            pattern: RegExp;
            inside: {
                "literal-block-punctuation": {
                    pattern: RegExp;
                    alias: string;
                };
            };
        };
        "list-bullet": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        "doctest-block": {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                punctuation: RegExp;
            };
        };
        inline: {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                bold: {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
                italic: {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
                "inline-literal": {
                    pattern: RegExp;
                    lookbehind: boolean;
                    alias: string;
                };
                role: {
                    pattern: RegExp;
                    alias: string;
                    inside: {
                        punctuation: RegExp;
                    };
                };
                "interpreted-text": {
                    pattern: RegExp;
                    lookbehind: boolean;
                    alias: string;
                };
                substitution: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    alias: string;
                };
                punctuation: RegExp;
            };
        }[];
        link: {
            pattern: RegExp;
            alias: string;
            inside: {
                punctuation: RegExp;
            };
        }[];
        punctuation: {
            pattern: RegExp;
            lookbehind: boolean;
        };
    };
    export { rest_1 as rest };
    export namespace rip {
        export namespace comment_45 {
            const pattern_155: RegExp;
            export { pattern_155 as pattern };
            const greedy_65: boolean;
            export { greedy_65 as greedy };
        }
        export { comment_45 as comment };
        export namespace char_4 {
            const pattern_156: RegExp;
            export { pattern_156 as pattern };
            const greedy_66: boolean;
            export { greedy_66 as greedy };
        }
        export { char_4 as char };
        export namespace string_43 {
            const pattern_157: RegExp;
            export { pattern_157 as pattern };
            const greedy_67: boolean;
            export { greedy_67 as greedy };
        }
        export { string_43 as string };
        export namespace regex_3 {
            const pattern_158: RegExp;
            export { pattern_158 as pattern };
            const lookbehind_69: boolean;
            export { lookbehind_69 as lookbehind };
            const greedy_68: boolean;
            export { greedy_68 as greedy };
        }
        export { regex_3 as regex };
        const keyword_42: RegExp;
        export { keyword_42 as keyword };
        const builtin_4: RegExp;
        export { builtin_4 as builtin };
        const boolean_24: RegExp;
        export { boolean_24 as boolean };
        export const date: RegExp;
        export const time: RegExp;
        const datetime_2: RegExp;
        export { datetime_2 as datetime };
        const symbol_5: RegExp;
        export { symbol_5 as symbol };
        const number_41: RegExp;
        export { number_41 as number };
        const punctuation_57: RegExp;
        export { punctuation_57 as punctuation };
        export const reference: RegExp;
    }
    export namespace roboconf {
        const comment_46: RegExp;
        export { comment_46 as comment };
        export namespace keyword_43 {
            const pattern_159: RegExp;
            export { pattern_159 as pattern };
            const lookbehind_70: boolean;
            export { lookbehind_70 as lookbehind };
        }
        export { keyword_43 as keyword };
        export namespace component {
            const pattern_160: RegExp;
            export { pattern_160 as pattern };
            const alias_54: string;
            export { alias_54 as alias };
        }
        const property_9: RegExp;
        export { property_9 as property };
        export namespace value_4 {
            const pattern_161: RegExp;
            export { pattern_161 as pattern };
            const lookbehind_71: boolean;
            export { lookbehind_71 as lookbehind };
            const alias_55: string;
            export { alias_55 as alias };
        }
        export { value_4 as value };
        export namespace optional {
            const pattern_162: RegExp;
            export { pattern_162 as pattern };
            const alias_56: string;
            export { alias_56 as alias };
        }
        export namespace wildcard {
            const pattern_163: RegExp;
            export { pattern_163 as pattern };
            const lookbehind_72: boolean;
            export { lookbehind_72 as lookbehind };
            const alias_57: string;
            export { alias_57 as alias };
        }
        const punctuation_58: RegExp;
        export { punctuation_58 as punctuation };
    }
    export const scss: any;
    export const scala: any;
    export const smali: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        "class-name": {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                "class-name": {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
                namespace: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    inside: {
                        punctuation: RegExp;
                    };
                };
                builtin: RegExp;
            };
        };
        builtin: {
            pattern: RegExp;
            lookbehind: boolean;
        }[];
        keyword: {
            pattern: RegExp;
            lookbehind: boolean;
        }[];
        function: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        field: {
            pattern: RegExp;
            alias: string;
        };
        register: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        boolean: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        number: {
            pattern: RegExp;
            lookbehind: boolean;
        };
        label: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        operator: RegExp;
        punctuation: RegExp;
    };
    export const smalltalk: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        char: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        symbol: RegExp;
        "block-arguments": {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                variable: RegExp;
                punctuation: RegExp;
            };
        };
        "temporary-variables": {
            pattern: RegExp;
            inside: {
                variable: RegExp;
                punctuation: RegExp;
            };
        };
        keyword: RegExp;
        boolean: RegExp;
        number: RegExp[];
        operator: RegExp;
        punctuation: RegExp;
    };
    export const solidity: any;
    import sol = solidity;
    export { sol };
    export const turtle: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        "multiline-string": {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
            inside: {
                comment: RegExp;
            };
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        url: {
            pattern: RegExp;
            greedy: boolean;
            inside: {
                punctuation: RegExp;
            };
        };
        function: {
            pattern: RegExp;
            inside: {
                "local-name": {
                    pattern: RegExp;
                    lookbehind: boolean;
                };
                prefix: {
                    pattern: RegExp;
                    inside: {
                        punctuation: RegExp;
                    };
                };
            };
        };
        number: RegExp;
        punctuation: RegExp;
        boolean: RegExp;
        keyword: RegExp[];
        tag: {
            pattern: RegExp;
            inside: {
                punctuation: RegExp;
            };
        };
    };
    import trig = turtle;
    export { trig };
    export const sparql: any;
    import rq = sparql;
    export { rq };
    const _splunk_spl: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        keyword: RegExp;
        "operator-word": {
            pattern: RegExp;
            alias: string;
        };
        function: RegExp;
        property: RegExp;
        date: {
            pattern: RegExp;
            alias: string;
        };
        number: RegExp;
        boolean: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export { _splunk_spl as splunk-spl };
    export const sqf: any;
    export const squirrel: any;
    export const stata: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        }[];
        "string-literal": {
            pattern: RegExp;
            greedy: boolean;
            inside: {
                interpolation: {
                    pattern: RegExp;
                    inside: {
                        punctuation: RegExp;
                        expression: {
                            pattern: RegExp;
                            inside: any;
                        };
                    };
                };
                string: RegExp;
            };
        };
        mata: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            alias: string;
            inside: any;
        };
        java: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            alias: string;
            inside: any;
        };
        python: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            alias: string;
            inside: any;
        };
        command: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            alias: string;
        };
        variable: RegExp;
        keyword: RegExp;
        boolean: RegExp;
        number: RegExp;
        function: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const iecst: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        }[];
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        keyword: RegExp[];
        "class-name": RegExp;
        address: {
            pattern: RegExp;
            alias: string;
        };
        number: RegExp;
        boolean: RegExp;
        operator: RegExp;
        function: RegExp;
        punctuation: RegExp;
    };
    export const supercollider: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        char: {
            pattern: RegExp;
            greedy: boolean;
        };
        symbol: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        keyword: RegExp;
        boolean: RegExp;
        label: {
            pattern: RegExp;
            alias: string;
        };
        number: RegExp;
        "class-name": RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    import sclang = supercollider;
    export { sclang };
    export const swift: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        };
        "string-literal": ({
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            inside: {
                interpolation: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    inside: any;
                };
                "interpolation-punctuation": {
                    pattern: RegExp;
                    alias: string;
                };
                punctuation: RegExp;
                string: RegExp;
            };
        } | {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            inside: {
                interpolation: {
                    pattern: RegExp;
                    lookbehind: boolean;
                    inside: any;
                };
                "interpolation-punctuation": {
                    pattern: RegExp;
                    alias: string;
                };
                string: RegExp;
                punctuation?: undefined;
            };
        })[];
        directive: {
            pattern: RegExp;
            alias: string;
            inside: {
                "directive-name": RegExp;
                boolean: RegExp;
                number: RegExp;
                operator: RegExp;
                punctuation: RegExp;
            };
        };
        literal: {
            pattern: RegExp;
            alias: string;
        };
        "other-directive": {
            pattern: RegExp;
            alias: string;
        };
        attribute: {
            pattern: RegExp;
            alias: string;
        };
        "function-definition": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        label: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        keyword: RegExp;
        boolean: RegExp;
        nil: {
            pattern: RegExp;
            alias: string;
        };
        "short-argument": RegExp;
        omit: {
            pattern: RegExp;
            alias: string;
        };
        number: RegExp;
        "class-name": RegExp;
        function: RegExp;
        constant: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const t4: any;
    const _t4_cs: any;
    export { _t4_cs as t4-cs };
    export const vbnet: any;
    const _t4_vb: any;
    export { _t4_vb as t4-vb };
    export namespace tap {
        export const fail: RegExp;
        export const pass: RegExp;
        export const pragma: RegExp;
        export const bailout: RegExp;
        export const version: RegExp;
        export const plan: RegExp;
        export namespace subtest {
            const pattern_164: RegExp;
            export { pattern_164 as pattern };
            const greedy_69: boolean;
            export { greedy_69 as greedy };
        }
        const punctuation_59: RegExp;
        export { punctuation_59 as punctuation };
        const directive_6: RegExp;
        export { directive_6 as directive };
        export namespace yamlish {
            const pattern_165: RegExp;
            export { pattern_165 as pattern };
            const lookbehind_73: boolean;
            export { lookbehind_73 as lookbehind };
            const inside_26: any;
            export { inside_26 as inside };
            const alias_58: string;
            export { alias_58 as alias };
        }
    }
    export namespace tcl {
        export namespace comment_47 {
            const pattern_166: RegExp;
            export { pattern_166 as pattern };
            const lookbehind_74: boolean;
            export { lookbehind_74 as lookbehind };
        }
        export { comment_47 as comment };
        export namespace string_44 {
            const pattern_167: RegExp;
            export { pattern_167 as pattern };
            const greedy_70: boolean;
            export { greedy_70 as greedy };
        }
        export { string_44 as string };
        const variable_16: {
            pattern: RegExp;
            lookbehind: boolean;
        }[];
        export { variable_16 as variable };
        export namespace _function_27 {
            const pattern_168: RegExp;
            export { pattern_168 as pattern };
            const lookbehind_75: boolean;
            export { lookbehind_75 as lookbehind };
        }
        export { _function_27 as function };
        const builtin_5: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        export { builtin_5 as builtin };
        export namespace scope {
            const pattern_169: RegExp;
            export { pattern_169 as pattern };
            const lookbehind_76: boolean;
            export { lookbehind_76 as lookbehind };
            const alias_59: string;
            export { alias_59 as alias };
        }
        export namespace keyword_44 {
            const pattern_170: RegExp;
            export { pattern_170 as pattern };
            const lookbehind_77: boolean;
            export { lookbehind_77 as lookbehind };
        }
        export { keyword_44 as keyword };
        const operator_42: RegExp;
        export { operator_42 as operator };
        const punctuation_60: RegExp;
        export { punctuation_60 as punctuation };
    }
    export const twig: {
        comment: RegExp;
        "tag-name": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        delimiter: {
            pattern: RegExp;
            alias: string;
        };
        string: {
            pattern: RegExp;
            inside: {
                punctuation: RegExp;
            };
        };
        keyword: RegExp;
        boolean: RegExp;
        number: RegExp;
        operator: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        punctuation: RegExp;
    };
    export const unrealscript: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        category: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            alias: string;
        };
        metadata: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
            inside: {
                property: RegExp;
                operator: RegExp;
                punctuation: RegExp;
            };
        };
        macro: {
            pattern: RegExp;
            alias: string;
        };
        "class-name": {
            pattern: RegExp;
            lookbehind: boolean;
        };
        keyword: RegExp;
        function: RegExp;
        boolean: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const uc: any;
    import uscript = unrealscript;
    export { uscript };
    export const uorazor: {
        "comment-hash": {
            pattern: RegExp;
            alias: string;
            greedy: boolean;
        };
        "comment-slash": {
            pattern: RegExp;
            alias: string;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            inside: {
                punctuation: RegExp;
            };
            greedy: boolean;
        };
        "source-layers": {
            pattern: RegExp;
            alias: string;
        };
        "source-commands": {
            pattern: RegExp;
            alias: string;
        };
        "tag-name": {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        delimiter: {
            pattern: RegExp;
            alias: string;
        };
        function: RegExp;
        keyword: RegExp;
        boolean: RegExp;
        number: RegExp;
        operator: (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        punctuation: RegExp;
    };
    export namespace uri {
        namespace scheme {
            const pattern_171: RegExp;
            export { pattern_171 as pattern };
            const greedy_71: boolean;
            export { greedy_71 as greedy };
            const inside_27: {
                "scheme-delimiter": RegExp;
            };
            export { inside_27 as inside };
        }
        namespace fragment {
            const pattern_172: RegExp;
            export { pattern_172 as pattern };
            const inside_28: {
                "fragment-delimiter": RegExp;
            };
            export { inside_28 as inside };
        }
        namespace query {
            const pattern_173: RegExp;
            export { pattern_173 as pattern };
            const inside_29: {
                "query-delimiter": {
                    pattern: RegExp;
                    greedy: boolean;
                };
                "pair-delimiter": RegExp;
                pair: {
                    pattern: RegExp;
                    inside: {
                        key: RegExp;
                        value: {
                            pattern: RegExp;
                            lookbehind: boolean;
                        };
                    };
                };
            };
            export { inside_29 as inside };
        }
        namespace authority {
            const pattern_174: RegExp;
            export { pattern_174 as pattern };
            const inside_30: {
                "authority-delimiter": RegExp;
                "user-info-segment": {
                    pattern: RegExp;
                    inside: {
                        "user-info-delimiter": RegExp;
                        "user-info": RegExp;
                    };
                };
                "port-segment": {
                    pattern: RegExp;
                    inside: {
                        "port-delimiter": RegExp;
                        port: RegExp;
                    };
                };
                host: {
                    pattern: RegExp;
                    inside: {
                        "ip-literal": {
                            pattern: RegExp;
                            inside: {
                                "ip-literal-delimiter": RegExp;
                                "ipv-future": RegExp;
                                "ipv6-address": RegExp;
                            };
                        };
                        "ipv4-address": RegExp;
                    };
                };
            };
            export { inside_30 as inside };
        }
        namespace path {
            const pattern_175: RegExp;
            export { pattern_175 as pattern };
            const inside_31: {
                "path-separator": RegExp;
            };
            export { inside_31 as inside };
        }
    }
    import url_1 = uri;
    export { url_1 as url };
    export const vala: any;
    export const verilog: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        "kernel-function": {
            pattern: RegExp;
            alias: string;
        };
        constant: RegExp;
        function: RegExp;
        keyword: RegExp;
        important: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const vhdl: {
        comment: RegExp;
        "vhdl-vectors": {
            pattern: RegExp;
            alias: string;
        };
        "quoted-function": {
            pattern: RegExp;
            alias: string;
        };
        string: RegExp;
        attribute: {
            pattern: RegExp;
            alias: string;
        };
        keyword: RegExp;
        boolean: RegExp;
        function: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export namespace vim {
        const string_45: RegExp;
        export { string_45 as string };
        const comment_48: RegExp;
        export { comment_48 as comment };
        const _function_28: RegExp;
        export { _function_28 as function };
        const keyword_45: RegExp;
        export { keyword_45 as keyword };
        const builtin_6: RegExp;
        export { builtin_6 as builtin };
        const number_42: RegExp;
        export { number_42 as number };
        const operator_43: RegExp;
        export { operator_43 as operator };
        const punctuation_61: RegExp;
        export { punctuation_61 as punctuation };
    }
    export namespace _visual_basic {
        export namespace comment_49 {
            const pattern_176: RegExp;
            export { pattern_176 as pattern };
            export namespace inside_32 {
                const keyword_46: RegExp;
                export { keyword_46 as keyword };
            }
            export { inside_32 as inside };
        }
        export { comment_49 as comment };
        export namespace directive_7 {
            const pattern_177: RegExp;
            export { pattern_177 as pattern };
            const alias_60: string;
            export { alias_60 as alias };
            const greedy_72: boolean;
            export { greedy_72 as greedy };
        }
        export { directive_7 as directive };
        export namespace string_46 {
            const pattern_178: RegExp;
            export { pattern_178 as pattern };
            const greedy_73: boolean;
            export { greedy_73 as greedy };
        }
        export { string_46 as string };
        export namespace date_1 {
            const pattern_179: RegExp;
            export { pattern_179 as pattern };
            const alias_61: string;
            export { alias_61 as alias };
        }
        export { date_1 as date };
        const number_43: RegExp;
        export { number_43 as number };
        const boolean_25: RegExp;
        export { boolean_25 as boolean };
        const keyword_47: RegExp;
        export { keyword_47 as keyword };
        const operator_44: RegExp;
        export { operator_44 as operator };
        const punctuation_62: RegExp;
        export { punctuation_62 as punctuation };
    }
    export { _visual_basic as visual-basic };
    export const vb: any;
    export const vba: any;
    export namespace warpscript {
        const comment_50: RegExp;
        export { comment_50 as comment };
        export namespace string_47 {
            const pattern_180: RegExp;
            export { pattern_180 as pattern };
            const greedy_74: boolean;
            export { greedy_74 as greedy };
        }
        export { string_47 as string };
        const variable_17: RegExp;
        export { variable_17 as variable };
        export namespace macro_1 {
            const pattern_181: RegExp;
            export { pattern_181 as pattern };
            const alias_62: string;
            export { alias_62 as alias };
        }
        export { macro_1 as macro };
        const keyword_48: RegExp;
        export { keyword_48 as keyword };
        const number_44: RegExp;
        export { number_44 as number };
        const boolean_26: RegExp;
        export { boolean_26 as boolean };
        const punctuation_63: RegExp;
        export { punctuation_63 as punctuation };
        const operator_45: RegExp;
        export { operator_45 as operator };
    }
    export namespace wasm {
        const comment_51: (RegExp | {
            pattern: RegExp;
            greedy: boolean;
        })[];
        export { comment_51 as comment };
        export namespace string_48 {
            const pattern_182: RegExp;
            export { pattern_182 as pattern };
            const greedy_75: boolean;
            export { greedy_75 as greedy };
        }
        export { string_48 as string };
        const keyword_49: (RegExp | {
            pattern: RegExp;
            inside: {
                operator: RegExp;
                punctuation?: undefined;
            };
        } | {
            pattern: RegExp;
            inside: {
                punctuation: RegExp;
                operator?: undefined;
            };
        })[];
        export { keyword_49 as keyword };
        const variable_18: RegExp;
        export { variable_18 as variable };
        const number_45: RegExp;
        export { number_45 as number };
        const punctuation_64: RegExp;
        export { punctuation_64 as punctuation };
    }
    export const wgsl: {
        comment: {
            pattern: RegExp;
            greedy: boolean;
        };
        "builtin-attribute": {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                attribute: {
                    pattern: RegExp;
                    alias: string;
                };
                punctuation: RegExp;
                "built-in-values": {
                    pattern: RegExp;
                    alias: string;
                };
            };
        };
        attributes: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        functions: {
            pattern: RegExp;
            lookbehind: boolean;
            alias: string;
        };
        keyword: RegExp;
        builtin: RegExp;
        "function-calls": {
            pattern: RegExp;
            alias: string;
        };
        "class-name": RegExp;
        "bool-literal": {
            pattern: RegExp;
            alias: string;
        };
        "hex-int-literal": {
            pattern: RegExp;
            alias: string;
        };
        "hex-float-literal": {
            pattern: RegExp;
            alias: string;
        };
        "decimal-float-literal": {
            pattern: RegExp;
            alias: string;
        }[];
        "int-literal": {
            pattern: RegExp;
            alias: string;
        };
        operator: ({
            pattern: RegExp;
            lookbehind?: undefined;
        } | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        punctuation: RegExp;
    };
    export const wiki: any;
    export const wolfram: {
        comment: RegExp;
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        keyword: RegExp;
        context: {
            pattern: RegExp;
            alias: string;
        };
        blank: {
            pattern: RegExp;
            alias: string;
        };
        "global-variable": {
            pattern: RegExp;
            alias: string;
        };
        boolean: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    import mathematica = wolfram;
    export { mathematica };
    import wl = wolfram;
    export { wl };
    import nb = wolfram;
    export { nb };
    export const wren: {
        comment: ({
            pattern: RegExp;
            greedy: boolean;
            lookbehind?: undefined;
        } | {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        })[];
        "triple-quoted-string": {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
        };
        "string-literal": any;
        hashbang: {
            pattern: RegExp;
            greedy: boolean;
            alias: string;
        };
        attribute: {
            pattern: RegExp;
            alias: string;
        };
        "class-name": (RegExp | {
            pattern: RegExp;
            lookbehind: boolean;
        })[];
        constant: RegExp;
        null: {
            pattern: RegExp;
            alias: string;
        };
        keyword: RegExp;
        boolean: RegExp;
        number: RegExp;
        function: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export namespace xojo {
        export namespace comment_52 {
            const pattern_183: RegExp;
            export { pattern_183 as pattern };
            const greedy_76: boolean;
            export { greedy_76 as greedy };
        }
        export { comment_52 as comment };
        export namespace string_49 {
            const pattern_184: RegExp;
            export { pattern_184 as pattern };
            const greedy_77: boolean;
            export { greedy_77 as greedy };
        }
        export { string_49 as string };
        const number_46: RegExp[];
        export { number_46 as number };
        export namespace directive_8 {
            const pattern_185: RegExp;
            export { pattern_185 as pattern };
            const alias_63: string;
            export { alias_63 as alias };
        }
        export { directive_8 as directive };
        const keyword_50: RegExp;
        export { keyword_50 as keyword };
        const operator_46: RegExp;
        export { operator_46 as operator };
        const punctuation_65: RegExp;
        export { punctuation_65 as punctuation };
    }
    export namespace yang {
        const comment_53: RegExp;
        export { comment_53 as comment };
        export namespace string_50 {
            const pattern_186: RegExp;
            export { pattern_186 as pattern };
            const greedy_78: boolean;
            export { greedy_78 as greedy };
        }
        export { string_50 as string };
        export namespace keyword_51 {
            const pattern_187: RegExp;
            export { pattern_187 as pattern };
            const lookbehind_78: boolean;
            export { lookbehind_78 as lookbehind };
        }
        export { keyword_51 as keyword };
        export namespace namespace_2 {
            const pattern_188: RegExp;
            export { pattern_188 as pattern };
            const lookbehind_79: boolean;
            export { lookbehind_79 as lookbehind };
        }
        export { namespace_2 as namespace };
        const boolean_27: RegExp;
        export { boolean_27 as boolean };
        const operator_47: RegExp;
        export { operator_47 as operator };
        const punctuation_66: RegExp;
        export { punctuation_66 as punctuation };
    }
}
//# sourceMappingURL=prism.d.ts.map