// pages/music/music.js
const tool = require('../../utils/tool.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicLink:{},
    musicInfo:{},
    musicLrc:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tool.loading();
    wx.request({
      url: "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=" + options.songId,
      success: (res) => {
        console.log(res);
        this.setData({
          musicLink:res.data.bitrate,
          musicInfo:res.data.songinfo
        })
        wx.request({ //获取歌词
          
          url: this.data.musicInfo.lrclink,
          success:(lrc)=>{
            //console.log(lrc);
            tool.stopLoading();
            let lrcArr=lrc.data.split('\n');
            //将歌词进行处理
            let lrcStr = lrcArr.join('');
            if(lrcStr.indexOf('[ti:') ==0){
              lrcArr.splice(0, 5)
            }
            this.setData({
              musicLrc: lrcArr
            })
          }
        })
      
    
      }
    })

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})