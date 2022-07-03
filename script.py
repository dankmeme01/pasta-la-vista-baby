from pathlib import Path
folder = Path(input('Folder: ')).resolve()
for item in folder.iterdir():
    if ' ' in item.name:
        item.rename(folder / item.name.replace(' ', '_'))