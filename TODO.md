# Project TODO

## Overview

Brief description of the project and its goals.

## Tasks

### Fix data_fetch.js

- Use a simpler algorythm. Maybe you could either add a distinct column to the html, or change the json in a way so that the value and the mervieniba are on the same string

- Make it escape the empty values properly. There was some interesting method ChatGPT offered, that only worked if the values are the same as the names of the columns in the table of the html? Not sure.

- Just make the algorythm simpler. This one is too shit and hard coded.

### Create a sorting algorythm

- Create it in a separate file and then import inside of the publicdata.html

- The algorythm for the sort:

1. Check the first two letters:
   IN or VI first
2. Sort by the number's size, e.g.:
   0101001
   0101002
   0102001
   0201001
   0301001
   etc.

### Create a search algorythm

- Possibly in a separate file

- Look up how search algorythms work, maybe there's an embedded function for doing that already in js

- Make it work only for the currently chosen scope by the button (show - what?)

### Make the buttons work

- Allow the buttons to only show the IN or VI elements

- Might need to think of the way to implement it.
- - Maybe could either choose only one of the fetches? Or make some elements disappear?
- - Maybe there is already some embedded function for filtering the table's elements. There probably should be, actually.

## Notes
