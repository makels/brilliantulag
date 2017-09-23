/**
 * Created by ZERG on 23.09.2017.
 */
var ClientRateForm = function() {

    this.rating = 0;

    this.init = function() {
        var scope = this;
        $('.client-rate-form .rate-stars-wrapper li').click(function() {
            scope.rating = $(this).attr('value');
            $('.client-rate-form .rate-stars-wrapper li i').removeClass("selected");
            for(var i = 0; i < scope.rating; i++) {
                $($('.client-rate-form .rate-stars-wrapper li i')[i]).addClass("selected");
            }
        });
    }

    this.open = function() {
        app.closeMenu();
        $(".form").hide();
        $(".client-rate-form").show();

        this.getWasherReviews();
        app.back = function() {
            app.orderDetailForm.open();
        }
    }

    this.getWasherReviews = function() {
        var scope = this;
        var order = app.clientOrderDetailForm.order;
        if(typeof(order.washer) == "undefined") return;
        $.ajax({
            url: app.apiUrl + "/get_washer_reviews",
            type: 'post',
            dataType: 'json',
            data: {
                washer_id: order.washer.id
            },
            success: function(response) {
                if(response.res == 0) {
                    $('#rate_washer').html(order.washer.name);
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
        var template = $('#client-rate-wrapper-tpl').html();
        var cnt = "";
        $.each(reviews, function(index, review) {
            cnt += template.replace(new RegExp("{date}", 'g'), moment(review.date).format("DD.MM.YYYY")).
            replace(new RegExp("{client_name}", 'g'), review.client).
            replace(new RegExp("{rate}", 'g'), review.rating).
            replace(new RegExp("{review-text}", 'g'), review.review);
        });
        $('#washer-reviews-wrapper').html(cnt);
        window.setTimeout(function() {
            $.each($('.client-rate-form .rate-stars-small'), function(index, el) {
                var rate = Number($(el).attr("rate"));
                for(var i = 0; i < rate; i++) {
                    $($(el).find('li i')[i]).addClass("selected");
                }
            });
        }, 500);
    }

    this.add = function() {
        var order = app.clientOrderDetailForm.order;
        var client_id = order.user_id;
        var washer_id = order.washer.id;
        var rating = $('.client-rate-form .rate-stars-wrapper i.selected').length;
        var review = $('#client_review_text').val();
        $.ajax({
            url: app.apiUrl + "/add_washer_review",
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
                    app.clientOrderDetailForm.open();
                } else {
                    app.hideMask();
                    app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
                    app.clientOrderDetailForm.open();
                }
            },
            error: function() {
                app.hideMask();
                app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
                app.clientOrderDetailForm.open();
            }
        });
    }

    this.init();
}