## Content

- [Options](#options)
  - [How to *get* an option](#how-to-get-an-option)
  - [How to *add* an option](#how-to-add-an-option)

# Options

Options are a easy way to configure the OS. They are stored in the files in `c/options/*.json`. All options are Dictionarys.

Example of a option file:

```json
{
    "key": "value",
    "key2": "value2"
}
```

## How to *get* an option

To get an option you can use the `System.options.get("optionNmae")` function (no '.json').

This will return the dictionary of the option file.

## How to *add* an option

To add an option you can use the `System.options.addValue("optionName", "key", "value", true)` function.
To brake it down

1.  The option name: "optionName" (no '.json')
2.  The key to set/add: "key"
3.  The value to set it to: "value"
4.  This is optional, if it is true, it will overwrite the value if it already exists. If it is false, it will not overwrite the value if it already exists. If it is not set, it will overwrite the value if it already exists.
