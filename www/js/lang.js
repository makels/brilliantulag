/**
 * Created by ZERG on 16.09.2017.
 */
var Lang = function() {

    this.prefix = 'ru';
    
    this.dict = null;

    this.init = function(success) {
        var scope = this;
        if(localStorage.getItem('lang') == null) localStorage.setItem('lang', this.prefix);
        this.prefix = localStorage.getItem('lang');
        switch (this.prefix) {
            case 'ru':
                this.dict = RU;
                break;
            case 'en':
                this.dict = EN;
                break;
            case 'tu':
                this.dict = TU;
                break;
        }
        this.translate();
        window.setTimeout(function() {
            success();
        },700);
    }
    
    this.translate = function() {
        var scope = this;
        var html = $('body').html();
        var re = /(@@[А-Яа-я0-9:&;()/., ]+)/g;
        var phrases = html.match(re);
        if(phrases == null || phrases.length == 0) return;
        $.each(phrases, function(index, phrase) {
            cphrase = phrase.replace("@@", "");
            tphrase = scope.get(cphrase);
            html = html.replace(phrase, tphrase);
        });
        $('body').html(html);
    }
    
    this.get = function(source) {
        $.each(this.dict, function(index, el) {
            if(el.length == 2 && el[0] == source) source = el[1];
        });
        return source;
    }

}