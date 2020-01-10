// pages/circulate/result/result.js
var QRCode = require('../../utils/qrcode.js');
var qrcode;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var result = options.result;
      if(result == 'success'){
        this.setData({
          result: '提交成功！'
        })
      }
      else if(result == 'fail'){
        this.setData({
          result: '提交失败！'
        })
      }
      else{
        this.setData({
          result: '长按即可保存二维码！'
        })
        qrcode = new QRCode('canvas', {
          text: result,
          width: 150,
          height: 150,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        })
      }
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

  },

  saveQrCode: function () {
    console.log('save')
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          qrcode.exportImage(function (path) {
            wx.saveImageToPhotosAlbum({
              filePath: path,
            })
          })
        }
      }
    })
  },

  save: function (e) {
    var that = this;
    wx.showModal({
      title: '是否保存二维码？',
      success: function () {
        wx.downloadFile({
          url: that.data.codeUrl,
          success: function (res) {
            var imageFilePath = res.tempFilePath;
            if (imageFilePath != undefined) {
              wx.saveImageToPhotosAlbum({
                filePath: imageFilePath,
                success: function (data) {
                  wx.showToast({
                    title: "保存成功",
                  })
                }, fail: function (res) {
                  wx.showToast({
                    title: "保存失败",
                    icon: 'none'
                  })
                }
              })
            }
          },
        })
      }
    })
  }
})