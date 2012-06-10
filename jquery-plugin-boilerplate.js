/**
 * A jQuery plugin boilerplate.
 * Author: Jonathan Nicol @f6design
 */
;(function($) {
  var pluginName = 'demoplugin';
 
  function Plugin(element, options) {
    var el = element;
    var $el = $(element);
 
    options = $.extend({}, $.fn[pluginName].defaults, options);
 
    function init() {
      // Add any initialization logic here...
 
      hook('onInit');
    }
 
    function fooPublic() {
      // Code goes here...
    }
 
    function option (key, val) {
      if (val) {
        options[key] = val;
      } else {
        return options[key];
      }
    }
 
    function destroy() {
      $el.each(function() {
        var el = this;
        var $el = $(this);
 
        // Add code to restore the element to its original state...
 
        hook('onDestroy');
        $el.removeData('plugin_' + pluginName);
      });
    }
 
    function hook(hookName) {
      if (options[hookName] !== undefined) {
        options[hookName].call(el);
      }
    }
 
    init();
 
    return {
      option: option,
      destroy: destroy,
      fooPublic: fooPublic
    };
  }
 
  $.fn[pluginName] = function(options) {
    if (typeof arguments[0] === 'string') {
      var methodName = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);
      var returnVal;
      this.each(function() {
        if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
          returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
        } else {
          throw new Error('Method ' +  methodName + ' does not exist on jQuery.' + pluginName);
        }
      });
      if (returnVal !== undefined){
        return returnVal;
      } else {
        return this;
      }
    } else if (typeof options === "object" || !options) {
      return this.each(function() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
      });
    }
  };
 
  $.fn[pluginName].defaults = {
    onInit: function() {},
    onDestroy: function() {}
  };
 
})(jQuery);