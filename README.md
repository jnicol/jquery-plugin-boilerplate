#A jQuery plugin boilerplate

I created this boilerplate for a jQuery plugin I was working on, and you can use it to kick start your own jQuery plugin development. The features of my boilerplate are:

- Plugin can be customised using options
- Setters/Getters for options
- Private and public methods
- Callback hooks
- Plugin instances can be destroyed

## Usage

The first thing you’ll need to do is change the name of the plugin, which is hardcoded as ‘demoplugin’, to something a little more descriptive. After that you should be able to follow the comments in the source code to customise the plugin.

Here are examples of how an end-user would interact with the plugin:

    // Initialize plugin with default options.
    $('#element').demoplugin();
    
    // Initialize plugin with user defined options.
    $('#element').demoplugin({
      option1: 2000,
      option2: 'value',
      callback1: function () { ... }
    });
    
    // Call a public method, no arguments.
    $('#element').demoplugin('publicFunctionName');
    
    // Call a public method with arguments.
    $('#element').demoplugin('publicFunctionName', 'arg1', 'arg2');
    
    // Get a plugin option.
    $('#element').demoplugin('option', 'key');
    
    // Set a plugin option after plugin initialization.
    $('#element').demoplugin('option', 'key', value);
    
    // Destroy plugin.
    $('#element').demoplugin('destroy');

## Setup options

It is very useful to be able to customise jQuery plugins on a per instance basis. The boilerplate implements default settings which can be overwritten when the plugin is initialized:

    // Default plugin options.
    $.fn[pluginName].defaults = {
      color: '#ff0000',
      height: 200
    };

    $('#element').demoplugin({
      color: '#0000ff',
      height: 400
    });

Options can also be overwritten after the plugin is initialized, using the `option` method:

    $('#element').demoplugin('option', 'color', '#00ff00');

An option value can be fetched using the same method by simply omitting the third parameter:

    var color = $('#element').demoplugin('option', 'color');

## Public and private methods

Private functions reduce the chance of your users inadvertently calling the plugin’s utility methods. I’m a fan of the [Revealing Module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript), so that’s how I chose to implement private/public functionality in my boilerplate.

    function Plugin(element, options) {
      // This method is public.
      function fooPublic(param1, param2) {
        // ...
      }
     
      // This method is private.
      function fooPrivate() {
        // ...
      }
     
      // Expose methods of Plugin we wish to be public.
      return {
        fooPublic: fooPublic
      };
    }

Public functions can be called by your users like so:

    $('#element').demoplugin('fooPublic', 'val1', 'val2');

##Callback hooks

Callback hooks are incredibly powerful. They allow your users to listen for events in your plugin’s behaviour and respond accordingly. Hooks are implemented as functions in the default options object:

    $.fn[pluginName].defaults = {
      onSlideshowFinished: function() {}
    };

Each function is empty to begin with, since the callback’s behaviour will be defined by the user. This is done by overwriting the callback function when setting the plugin’s options. The scope of the callback is the DOM element the plugin is attached to, so in the following example the DOM element would be hidden.

    $('#element').demoplugin({
      onSlideshowFinished: function() {
        $(this).hide();
      }
    });

To trigger a hook, call the plugin’s `hook` method:

    hook('onSlideshowFinished');

There are two callbacks implemented by default in the boilerplate: `onInit` and `onDestroy`.

##Destroying a plugin instance

Your users can remove an instance of the plugin by calling its `destroy` method:

    $('#element').demoplugin('destroy');

The plugin stores all its functionality in its DOM element’s `data` object. By default the `destroy` method simply removes the stored data values. You will probably need to customise destroy to restore the DOM element to its original state and remove any event handlers your plugin has created.

##Credit

My boilerplate takes inspiration from a number of sources, most notably the [jQuery plugin authoring guidelines](http://docs.jquery.com/Plugins/Authoring), [Stefan Gabos’ boilerplate](http://stefangabos.ro/jquery/jquery-plugin-boilerplate-oop/), and Zeno Rocha and Addy Osmani’s [jQuery Boilerplate](http://jqueryboilerplate.com/).
