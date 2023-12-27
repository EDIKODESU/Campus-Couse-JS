var express = require('express');
var app = express();
var fs = require('fs');
const request = require('request');
const path = require('path');
const sharp = require('sharp');

let port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.set('views', __dirname+'/');


app.get('/', function (req, res) {
  res.sendFile((__dirname + '/page.html'));
});

app.post('/send', function (req, res) {
  let m_data = {};
  // let arr_img = [];
  let str_img = '';
  for(let i = 1; i <= 5; i ++){
    if(fs.existsSync(`./image_${i}.png`)){
      fs.unlinkSync(`./image_${i}.png`)}
  }
  download(req.body.link, 'image_1.png', async function(){
    m_data = await imageMetadata();
    await CreateImage(m_data);
    await CreateImage_1(m_data);
    await CreateImage_2(m_data);
    await CreateImage_3(m_data);
    str_img += '<table>';
    str_img += "<tr>";
    str_img += `<td><img src="image_2.png"></td>`;
    str_img += `<td><img src="image_3.png"></td>`;
    str_img += "</tr>";
    str_img += "<tr>";
    str_img += `<td><img src="image_4.png"></td>`;
    str_img += `<td><img src="image_5.png"></td>`;
    str_img += "</tr>";
    str_img += '</table>';
    res.json({str: str_img});
  });
});

const imageMetadata = async() => {
  let result = 0;
  let width = {};
  let height = {};
  let rovn = {};
  const metadata = await sharp(path.resolve(__dirname,'image_1.png')).metadata()
  if(metadata.width > metadata.height){
   result = metadata.width - metadata.height
   width = {result_w: result,
            width: metadata.width,
            height: metadata.height
          };
   return width;
  }
  else if(metadata.width < metadata.height){
    result = metadata.height - metadata.width
    height = {result_h: result,
      width: metadata.width,
      height: metadata.height
    };
    return height;
   }
   else if (metadata.width == metadata.height){
     rovn = {rovn: ronv,
      width: metadata.width,
      height: metadata.height}
     return rovn;
   }
}

const CreateImage_1 = async (m_data) => {
  for (var key in m_data){
    if(key == 'rovn'){
      const resize = await sharp(path.resolve(__dirname,'image_1.png')).tint({r: 255, g: 0, b: 0}).toFile(path.resolve(__dirname,'image_3.png'));
      break;
    }
    if(key == 'result_h'){
      const resize = await sharp(path.resolve(__dirname,'image_1.png'))
  .resize(m_data.width, m_data.height - m_data_result_h).tint({r: 255, g: 0, b: 0}).toFile(path.resolve(__dirname,'image_3.png'));
  break;
    }
    if(key == 'result_w'){
      const resize = await sharp(path.resolve(__dirname,'image_1.png'))
  .resize(m_data.width - m_data.result_w, m_data.height).tint({r: 255, g: 0, b: 0}).toFile(path.resolve(__dirname,'image_3.png'));
  break;
    }
  }
}
const CreateImage_2 = async (m_data) => {
  for (var key in m_data){
    if(key == 'rovn'){
      const resize = await sharp(path.resolve(__dirname,'image_1.png')).tint({r: 0, g: 255, b: 0}).toFile(path.resolve(__dirname,'image_4.png'));
      break;
    }
    if(key == 'result_h'){
      const resize = await sharp(path.resolve(__dirname,'image_1.png'))
  .resize(m_data.width, m_data.height - m_data_result_h).tint({r: 0, g: 255, b: 0}).toFile(path.resolve(__dirname,'image_4.png'));
  break;
    }
    if(key == 'result_w'){
      const resize = await sharp(path.resolve(__dirname,'image_1.png'))
  .resize(m_data.width - m_data.result_w, m_data.height).tint({r: 0, g: 255, b: 0}).toFile(path.resolve(__dirname,'image_4.png'));
  break;
    }
  }
}
const CreateImage_3 = async (m_data) => {

  for (var key in m_data){
    if(key == 'rovn'){
      const resize = await sharp(path.resolve(__dirname,'image_1.png')).tint({r: 0, g: 0, b: 255}).toFile(path.resolve(__dirname,'image_5.png'));
      break;
    }
    if(key == 'result_h'){
      const resize = await sharp(path.resolve(__dirname,'image_1.png'))
  .resize(m_data.width, m_data.height - m_data_result_h).tint({r: 0, g: 0, b: 255}).toFile(path.resolve(__dirname,'image_5.png'));
  break;
    }
    if(key == 'result_w'){
      const resize = await sharp(path.resolve(__dirname,'image_1.png'))
  .resize(m_data.width - m_data.result_w, m_data.height).tint({r: 0, g: 0, b: 255}).toFile(path.resolve(__dirname,'image_5.png'));
  break;
    }
  }
}
const CreateImage = async (m_data) => {
  for (var key in m_data){
    if(key == 'rovn'){
      const resize = await sharp(path.resolve(__dirname,'image_1.png')).toFile(path.resolve(__dirname,'image_2.png'));
      break;
    }
    if(key == 'result_h'){
      const resize = await sharp(path.resolve(__dirname,'image_1.png'))
  .resize(m_data.width, m_data.height - m_data_result_h).toFile(path.resolve(__dirname,'image_2.png'));
  break;
    }
    if(key == 'result_w'){
      const resize = await sharp(path.resolve(__dirname,'image_1.png'))
  .resize(m_data.width - m_data.result_w, m_data.height).toFile(path.resolve(__dirname,'image_2.png'));
  break;
    }
  }
}

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){    
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

app.listen(port, function() {
  console.log('Server started');
});
