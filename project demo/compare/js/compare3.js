

(function ($) {
    var list = [];

    /* function to be executed when product is selected for comparision*/
    $(document).on('click', '.addToCompare', function () {
        $(".comparePanle").show();
        $(this).toggleClass("rotateBtn");
        $(this).parents(".selectProduct").toggleClass("selected");
        var productID = $(this).parents('.selectProduct').attr('data-id');

        var inArray = $.inArray(productID, list);
        if (inArray < 0) {
            if (list.length < 3) {
                list.push(productID);

                var displayTitle = $(this).parents('.selectProduct').attr('data-title');

                var image = $(this).siblings(".productImg").attr('src');
                
                $(".comparePan").append('<div id="' + productID + '" class="relPos titleMargin w3-margin-bottom  col-lg-3 col-md-4 col-sm-4"><div class="w3-white titleMargin"><a class="selectedItemCloseBtn w3-closebtn cursor">&times</a><img src="' + image + '" alt="image" style="height:100px;"/><p id="' + productID + '" class="titleMargin1">' + displayTitle + '</p></div></div>');
            }
            else{
                
                $("#WarningModal").modal();

                $(this).toggleClass("rotateBtn");
                $(this).parents(".selectProduct").toggleClass("selected");
                return;
            }

            
        } else {
            list.splice($.inArray(productID, list), 1);         
            $('#' + productID).remove();
            hideComparePanel();
        }


        if (list.length > 1) {
            $(".cmprBtn").addClass("active");
            $(".cmprBtn").removeAttr('disabled');
        } else {
            $(".cmprBtn").removeClass("active");
            $(".cmprBtn").attr('disabled', '');
        }

    });


    /*function to be executed when compare button is clicked*/
    $(document).on('click', '.cmprBtn', function () {
        if ($(".cmprBtn").hasClass("active")) {

            /* this is to print the  features list statically*/
            $(".contentPop").append('<div class="col-sm-3 compareItemParent relPos">' + '<ul class="product">' + '<li class="relPos compHeader"><p class="w3-display-middle">Features</p></li>' + '<li>Title</li>' + '<li>Size</li>' + '<li>Weight</li>' + '<li class="cpu">Processor</li>' + '<li>Battery</li></ul>' + '</div>');

            for (var i = 0; i < list.length; i++) {
                /* this is to add the items to popup which are selected for comparision */
                product = $('.selectProduct[data-id="' + list[i] + '"]');
                var image = $('[data-id=' + list[i] + ']').find(".productImg").attr('src');
                var title = $('[data-id=' + list[i] + ']').attr('data-title');
                /*appending to div*/
                $(".contentPop").append('<div class="col-sm-3 compareItemParent relPos">' + '<ul class="product">' + '<li class="compHeader"><img src="' + image + '" class="compareThumb"></li>' + '<li>' + title + '</li>' + '<li>' + $(product).data('size') + '</li>' + '<li>' + $(product).data('weight') + '<li class="cpu">' + $(product).data('processor') + '</li>' + '<li>' + $(product).data('battery') + '</ul>' + '</div>');
            }
        }
        $(".modPos").show();
    });
    

    /* function to close the comparision popup */
    $(document).on('click', '.closeBtn', function () {
        $(".contentPop").empty();
        $(".comparePan").empty();
        $(".comparePanle").hide();
        $(".modPos").hide();
        $(".selectProduct").removeClass("selected");
        $(".cmprBtn").attr('disabled', '');
        list.length = 0;
        $(".rotateBtn").toggleClass("rotateBtn");
    });

    /*function to remove item from preview panel*/
    $(document).on('click', '.selectedItemCloseBtn', function () {

        var test = $(this).siblings("p").attr('id');
        $('[data-id=' + test + ']').find(".addToCompare").click();
        hideComparePanel();
    });

    function hideComparePanel() {
        if (!list.length) {
            $(".comparePan").empty();
            $(".comparePanle").hide();
        }
    }
})(jQuery);
