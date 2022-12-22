from jsmin import jsmin

with open('C:/Users/flori/OneDrive/Dokumente/GitHub/FloriPro-Helpers2/programs/vote/anychart/js/anychart-base.min.js', 'r') as f:
    js = f.read()

with open('output.js', 'w') as f:
    f.write(jsmin(js))
