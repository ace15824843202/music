// pages/request/request.js

function getMusic(_this) {  //获取歌单
  wx.request({
    url: "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=2&size=10&offset=" + _this.data.offset,
    success: (res) => {
      tool.stopLoading();
      //每次下拉刷新的数据存入musiclist
      let musiclist = _this.data.musicArr.concat(res.data.song_list);
      //console.log(musiclist)
      _this.setData({
        musicArr: musiclist
      })


    }
  })

}

const tool = require('../../utils/tool.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicArr: [],
    offset: 0,
    seacherArr: [],
    flag: false,//判断是否触发了搜索
    tip: ""

  },
  seacherSong(e) {
    console.log(e);
    if (!e.detail.value) {
      getMusic(this);
      this.setData({
        flag: false
      })
      return;
    }
    tool.loading();
    wx.request({
      url: "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query=" + e.detail.value,
      success: (res) => {
        tool.stopLoading();
        console.log(res);
        tool.stopLoading();
        //console.log(res.data.errno);
        if (res.data.errno == 22001) {
          this.setData({
            tip: '没有数据 :(',
            flag: true
          })
          console.log(this.data.tip);
          return;
        }
        this.setData({
          seacherArr: res.data.song,
          flag: true,
          top: ''
        })
        //console.log(res.data.song_list);
        //每次下拉刷新的数据存入musiclist

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tool.loading();
    getMusic(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let offset = this.data.offset + 10;
    this.setData({ offset });
    getMusic(this);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})