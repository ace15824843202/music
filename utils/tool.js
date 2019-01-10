function loading(){
  wx.showLoading({
    title: '加载中',
  })
}
function stopLoading(){
  wx.hideLoading()
}

module.exports = {
  loading,
  stopLoading
}