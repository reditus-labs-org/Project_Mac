import sys,pathlib,io,urllib.request
sys.path.insert(0,'tmp/pdf-deps')
import pymupdf
from PIL import Image
root=pathlib.Path('public/images');root.mkdir(parents=True,exist_ok=True)
doc=pymupdf.open('MAC.pdf')
images={'uiic':1118,'kryon':1132,'srm':1147,'stanley':1160,'hanon':1174,'green-coconut':1187,'relevantz':1201,'castwel':1215,'sathya':1237,'sundaram':1251,'sterling':1265,'gurit':1279,'ngc':1293,'bosch':1315,'caplin':1341,'bharat':1354,'principal':890}
for name,xref in images.items():
 data=doc.extract_image(xref);im=Image.open(io.BytesIO(data['image'])).convert('RGB');im.thumbnail((1600,1600));im.save(root/(name+'.webp'),'WEBP',quality=88,method=6)
pix=pymupdf.Pixmap(doc,53);smask=next(i[1] for i in doc[0].get_images() if i[0]==53)
if smask:pix=pymupdf.Pixmap(pix,pymupdf.Pixmap(doc,smask))
pix.save(str(root/'mac-mark.png'))
print('Extracted',len(images),'original photographs and logo')
