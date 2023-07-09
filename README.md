# uidgen
Unturned ID List Generator.

This is a rudimentary, and flawed ID List generator.
I primarily use this to cut down time creating ID lists for items when there are a lot of items within a mod.

Some of the flaws include:
- No easy way to embed images on steam without using imgur, and thus needing a lot of effort for it regardless.
- Only searches folders 2 levels deep, so recursive items or items within items are not picked up by the id list generator.


There are 2 files, both can just be run using Node JS, didn't want to make anything complicated so it's this lovely contraption.
Chuck the folders of bundles in a folder called "genid" and run it, it will generate an output.
