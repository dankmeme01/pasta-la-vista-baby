from PIL import Image
from pathlib import Path

TARGET_WIDTH = 377

folder = Path(input("Folder: ")).resolve()
out_folder = folder / 'out'
out_folder.mkdir(exist_ok=True)

for file in folder.iterdir():
    if file.is_dir():
        continue

    img = Image.open(str(file))
    width, height = img.size
    if width > TARGET_WIDTH:
        ratio = TARGET_WIDTH / width

        new_width = int(width * ratio)
        new_height = int(height * ratio)

        img = img.resize((new_width, new_height))
        img.save(str(out_folder / file.name))
