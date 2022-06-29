from PIL import Image
from pathlib import Path
from rich.progress import track

TARGET_WIDTH = 377
TARGET_HEIGHT = 265

folder = Path(input("Folder: ")).resolve()
# out_folder = folder / 'out'
# out_folder.mkdir(exist_ok=True)

# for file in track(folder.iterdir()):
#     if file.is_dir():
#         continue

#     outfile = out_folder / file.name
#     if outfile.exists():
#         continue

#     img = Image.open(str(file))
#     width, height = img.size
#     if width > TARGET_WIDTH:
#         ratio = TARGET_WIDTH / width

#         new_width = int(width * ratio)
#         new_height = int(height * ratio)

#         img = img.resize((new_width, new_height))
#         img.save(str(outfile))

# print("Stage 1 done, beginning stage 2")

out_folder = folder / 'stage2'
out_folder.mkdir(exist_ok=True)

for file in track((folder / 'out').iterdir()):
    if file.is_dir():
        continue

    outfile = out_folder / file.name
    if outfile.exists():
        continue

    img = Image.open(str(file))
    width, height = img.size
    if height > TARGET_HEIGHT:
        border = (height - TARGET_HEIGHT) // 2
        img = img.crop((0, border, width, height - border))
    img.save(str(outfile))
