/*!
 * jQuery SilverTrack - Bullet Navigator Plugin
 * https://github.com/tulios/jquery.silver_track
 * version: 0.1.0
 */

(function ($, window, document) {

  /*
   * track.install(new SilverTrack.Plugins.BulletNavigator({
   *   container: $(".bullet-pagination")
   * }));
   *
   */
  $.silverTrackPlugin("BulletNavigator", {
    defaults: {
      bulletClass: "bullet",
      activeClass: "active"
    },

    constructor: function(options) {
      this.track = null;
      this.options = options;
      this.container = this.options.container;
    },

    onInstall: function(track) {
      this.track = track;
    },

    afterStart: function() {
      var self = this;
      for (var i = 0; i < this.track.totalPages; i++) {
        this.container.append(this._createBullet(i + 1));
      }

      this._getBulletByPage(1).addClass(this.options.activeClass);
      this._getBullets().click(function(e) {
        e.preventDefault();
        var bullet = $(this);
        self._updateBullets(bullet);
        self.track.goToPage(bullet.data("page"));
      });
    },

    beforePagination: function(track, event) {
      var bullet = this._getBulletByPage(event.page);
      this._updateBullets(bullet);
    },

    afterRestart: function() {
      var bullet = this._getBulletByPage(1);
      this._updateBullets(bullet);
    },

    _updateBullets: function(bullet) {
      this._getBullets().removeClass(this.options.activeClass);
      bullet.addClass(this.options.activeClass);
    },

    _getBulletByPage: function(page) {
      return $("." + this.options.bulletClass + "[data-page='" + page + "']", this.container);
    },

    _getBullets: function() {
      return $("." + this.options.bulletClass, this.container);
    },

    _createBullet: function(page) {
      return $("<a></a>", {"class": this.options.bulletClass, "data-page": page, "href": "#"});
    }

  });

})(jQuery, window, document);
