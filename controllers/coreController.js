//+ GET Index
exports.index = (req, res) => {
  //req.flash('success', 'flash works');
  res.render('index', {
    title: 'Top'
  });
}