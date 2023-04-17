const express = require('express')
// const exphbs = require('express-handlebars').create();
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser')
const multer = require('multer');
const port = 3000;
const app = express();
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs');
//mongoose db connection  
const mongoose = require('mongoose');

const url = 'mongodb+srv://sondnph20371:9WAkCEiwRsTJ4x9o@cluster0.yclblt9.mongodb.net/ph20371_daongocson?retryWrites=true&w=majority';
const spModel = require('./spModel');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.get('/', (req, res) => {
    res.render('Default');
});

app.get('/sanphams', async (req, res) => {
    await mongoose.connect(url).then(console.log('kets noi db thanh cong'));
    const sanphams = await spModel.find();
    res.render('Default', {
        listSP: sanphams.map(sanpham => sanpham.toJSON())

    });
  
});

app.get('/search_sanpham',async (req, res) => {
   
   
    const sanpham = await spModel.find({tensp: req.body.name});
       res.render('search', {listSearch: sanpham.toJSON()});
   
});


app.get('/addSP', (req, res) => {
    res.render('addsp');
});
app.post("/addSP", async (req, res) => {
    if (req.body.id == '') {
        try {
            spModel.create(req.body)
                .then(data => {
                    res.redirect('sanphams');
                })
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err);
        }
        res.render('addsp');
    } else {
        await spModel.findOneAndUpdate({_id:req.body.id}, req.body, {new: true});
        res.redirect('/sanphams');
    }
   

});


app.get('/updatesp/:id', async (req, res) => {
    const sp = await spModel.findById(req.params.id);

    res.render('addsp', {object: sp.toJSON(), title: "Cập nhật thông tin sản phẩm" });
});


app.get('/deletesp/:id', async (req, res) => {
    await mongoose.connect(url).then(console.log('ket noi db thanh cong'));

    try {
        // var results = await spModel.findOneAndRemove({ten: 'nam'});
        // console.log(results);
        await spModel.findByIdAndDelete(req.params.id, req.body);
        res.redirect('/sanphams');


        // res.send(results);
        // await sv.save();

    } catch (e) {
        res.status(500).send(e);
    }
});






app.listen(port, () => console.log('Server started on port 3000'));
