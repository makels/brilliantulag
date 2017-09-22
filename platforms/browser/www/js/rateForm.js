/**
 * Created by ZERG on 18.09.2017.
 */
var RateForm = function() {

    this.rating = 0;

    this.init = function() {
        var scope = this;
        $('.rate-stars-wrapper li').click(function() {
            scope.rating = $(this).attr('value');
            $('.rate-stars-wrapper li i').removeClass("selected");
            for(var i = 0; i < scope.rating; i++) {
                $($('.rate-stars-wrapper li i')[i]).addClass("selected");
            }
        });
    }
    
    this.open = function() {
        app.closeMenu();
        $(".form").hide();
        $(".rate-form").show();

        this.getClientReviews();
        app.back = function() {
            app.orderDetailForm.open();
        }
    }

    this.getClientReviews = function() {
        var scope = this;
        var order = app.orderDetailForm.order;
        $.ajax({
            url: app.apiUrl + "/get_client_reviews",
            type: 'post',
            dataType: 'json',
            data: {
                user_id: order.user_id
            },
            success: function(response) {
                if(response.res == 0) {
                    $('#rate_client').html(order.name);
                    scope.setReviews(response.reviews);
                } else {
                    app.hideMask();
                    app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
                    app.open();
                }
            }
        });
    }
    
    this.setReviews = function(reviews) {
        var template = $('#rate-wrapper-tpl').html();
        var cnt = "";
        $.each(reviews, function(index, review) {
            cnt += template.replace(new RegExp("{date}", 'g'), moment(review.date).format("DD.MM.YYYY")).
                replace(new RegExp("{washer_name}", 'g'), review.washer).
                replace(new RegExp("{rate}", 'g'), review.rating).
                replace(new RegExp("{review-text}", 'g'), review.review);
        });
        $('#reviews-wrapper').html(cnt);
        window.setTimeout(function() {
            $.each($('.rate-stars-small'), function(index, el) {
                var rate = Number($(el).attr("rate"));
                for(var i = 0; i < rate; i++) {
                    $($(el).find('li i')[i]).addClass("selected");
                }
            });
        }, 500);
    }

    this.add = function() {
        var order = app.orderDetailForm.order;
        var client_id = order.user_id;
        var washer_id = app.washer.washerData.id;
        var rating = $('.rate-stars-wrapper i.selected').length;
        var review = $('#review_text').val();
        $.ajax({
            url: app.apiUrl + "/add_client_review",
            type: 'post',
            dataType: 'json',
            data: {
                client_id: client_id,
                washer_id: washer_id,
                rating: rating,
                review: review
            },
            success: function(response) {
                app.hideMask();
                if(response.res == 0) {
                    app.message.show(app.lang.get('Отзыв'), app.lang.get('Ваш отзыв принят.'));
                    app.orderDetailForm.open();
                } else {
                    app.hideMask();
                    app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
                    app.orderDetailForm.open();
                }
            },
            error: function() {
                app.hideMask();
                app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
                app.orderDetailForm.open();
            }
        });
    }

    this.init();
}