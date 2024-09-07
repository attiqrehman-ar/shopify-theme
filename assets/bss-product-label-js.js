/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return integrationWithOtherApps; });
function  integrationWithOtherApps ($, dataLabel, dataProduct) {
    let ProdId = dataProduct.id.toString();
    let checkIntegration = true // if that true ,acception append HTML List in the parent
    let rateElements = $('#scm-product-detail-rate, .scm-reviews-rate')
    let checkProductApplyLabel = false;

    $.each(rateElements, function(index, rateElement) {
        let laiReviewProdId = $(rateElement) && $(rateElement).length ? JSON.parse($(rateElement).attr('data-product-id')) : ''
        if (BSS_PL.integration.laiReview.config && laiReviewProdId == ProdId) {
                BSS_PL.integration.laiReview.config.forEach(integrationConfig => {
                    if (integrationConfig.status && dataLabel.label_id == integrationConfig.label_id) {
                        if (checkProductApplyLabel) {
                            return
                        }
                        let laiReviewConfig = $(rateElement) && $(rateElement).length ? JSON.parse($(rateElement).attr('data-rate-version2')) : null
                        if (laiReviewConfig == null) {
                            checkIntegration = false
                            return
                        }
                        let totalReview = '';
                        let reviewPoint = '';
                        let review = '';
                        let total = laiReviewConfig.rate1 + laiReviewConfig.rate2 + laiReviewConfig.rate3 + laiReviewConfig.rate4 + laiReviewConfig.rate5
                        let average = laiReviewConfig.average
                        let condition = ''
                        if (integrationConfig.condition.length) {
                            integrationConfig.condition.forEach(integrationLaiCondition => {
                                if (integrationLaiCondition.type == "totalReview") {
                                    totalReview = total
                                    totalReview += integrationLaiCondition.check == "greater" ? " > " : " < "
                                    totalReview += integrationLaiCondition.num.toString()
                                }
                                if (integrationLaiCondition.type == "reviewPoint") {
                                    reviewPoint = average
                                    reviewPoint += integrationLaiCondition.check == "greater" ? " > " : " < "
                                    reviewPoint += integrationLaiCondition.num.toString()
                                }
                                if (integrationLaiCondition.type == "rate5" || integrationLaiCondition.type == "rate4" || integrationLaiCondition.type == "rate3" || integrationLaiCondition.type == "rate2" || integrationLaiCondition.type == "rate1") {
                                    review += `laiReviewConfig.${integrationLaiCondition.type}`
                                    review += integrationLaiCondition.check == "greater" ? " > " : " < "
                                    review += integrationLaiCondition.num.toString()
                                    review += integrationConfig.type == 0 ? " && " : " || "

                                }
                            })
                            if (integrationConfig.type == 0) {
                                    if (totalReview) {
                                        condition += totalReview + " && "
                                    }
                                    if (reviewPoint) {
                                        condition += reviewPoint + " && "
                                    }
                                    if (review) {
                                        condition += review
                                    }
                            } else {
                                if (totalReview) {
                                    condition += totalReview + " || "
                                }
                                if (reviewPoint) {
                                    condition += reviewPoint + " || "
                                }
                                if (review) {
                                    condition += review
                                }
                            }
                            if (condition[condition.length-2] == "&" || condition[condition.length-2] == "|") {
                                condition = condition.slice(0, condition.length-3)
                            }
                            if (!eval(condition)) {
                                checkIntegration = false
                            }
                            checkProductApplyLabel = true
                        }
                    }
                })
        }
    })
    return checkIntegration;
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/public/static/base/js/src/utils/traverseParentToFindElementBySelector.js
function traverseParentToFindElementBySelector($, rootElement, selector) {
    if ($(rootElement).is(selector)) return rootElement;
    if ($(rootElement).find(selector).length) return $(rootElement).find(selector)[0];
    if (rootElement === document.documentElement) return null;
    return traverseParentToFindElementBySelector($, rootElement.parentNode, selector)
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/badge/name/findPriceElementForBadgeName.js

function findPriceElementForBadgeName($, BSS_PL, parent, page) {
    let priceEl = '';
    // For Express theme
    if ($(parent).hasClass('product-card__price-wrapper') || $(parent).find('.product-card__price-wrapper').length) {
        if ($(parent).find('.product-card__price-wrapper').length) {
            priceEl = $(parent).find('.product-card__price-wrapper');
        } else {
            priceEl = $(parent);
        }
    }
    // For Carft theme
    else if ($(parent).hasClass('card__heading') && $(parent).closest('.card__information').find('.price').length) {
        if (window.location.pathname == '/search') {
            priceEl = $(parent).closest('.card__information').find('.card__heading');
        }
        else priceEl = $(parent).closest('.card__information').find('.price');
    }
    // Fix for feature product express
    else if ($(parent).hasClass('product__gallery') || $(parent).closest('section.product').find('.product__content .price').length) {
        priceEl = $(parent).closest('section.product').find('.product__content .price');
    }
    // For Simple theme
    else if ($(parent).hasClass('product__title') && $(parent).parent().find('.product__prices').length) {
        priceEl = $(parent).parent().find('.product__prices');
    }
    // For feature product Dawn Theme
    else if ($(parent).parent().parent().hasClass('featured-product')) {
        priceEl = $(parent).find('.price');
    }
    //XuTho
    else if ($(parent).find('.list-view-item__title').length) {
        priceEl = $(parent).find('.list-view-item__title');
    }
    // For Boundless theme
    else if ($(parent).hasClass('product-item__link-wrapper') && $(parent).find('.product-item__meta .product-item__price-wrapper').length) {
        priceEl = $(parent).find('.product-item__meta .product-item__price-wrapper');
    } else if ($(parent).hasClass('featured-product__photo') && $(parent).closest('.product.featured-product').find('.featured-product__details .product__form--add-to-cart').length) {
        priceEl = $(parent).closest('.product.featured-product').find('.featured-product__details .product__form--add-to-cart');
    }
    // For Venture
    else if ($(parent).hasClass('grid__item') && $(parent).find('.product-card .product-card__availability').length) {
        priceEl = $(parent).find('.product-card .product-card__availability');
    }
    // For supply
    else if ($(parent).attr('itemprop') == "offers") {
        priceEl = $(parent);
    }
    // For Minimal theme
    else if ($(parent).hasClass('product__img-wrapper') && $(parent).closest('.grid__item').find('a .grid-link__meta')) {
        priceEl = $(parent).closest('.grid__item').find('a .grid-link__meta');
    }
    // Theme Debut
    else if ($(parent).hasClass('product-single__media') && $(parent).closest('.page-width').find('.featured-product__price').length) {
        priceEl = $(parent).closest('.page-width').find('.featured-product__price');
    }
    // Narrative feature product
    else if ($(parent).hasClass('product-media--featured-product') && $(parent).closest('.featured-product__wrapper').find('.featured-product__content-column .product__price').length) {
        priceEl = $(parent).closest('.featured-product__wrapper').find('.featured-product__content-column .product__price');
    }
    //fix label compatible with Beae - Pgage builder by tungnk
    else if (window.location.pathname.includes("/page") && $(".beae-builder") && $(".beae-builder").length) {
        priceEl = $(parent).closest(".beae-products-item--information-wrapper").find(".core__microelement--price")
    }
    // For debut & common theme
    else if ($(parent).find('dl[class*="price"]').first().length && !(BSS_PL.storeId == 5221 && window.location.pathname == '/search')) {
        priceEl = $(parent).find('dl[class*="price"]').first();
    }
    // handle the parent closest to the cart form (in cart page)
    else if ($(parent).closest('form[action="/cart"]').length && !$(parent).closest('#CartDrawer').length) {
        let cartName = traverseParentToFindElementBySelector($, parent, '[class*="cart"][class*="name"]')
        if (cartName) {
            let cartPrice = $(cartName).next()
            while (cartPrice.length && $(cartPrice).hasClass('bss_pb_img')) {
                cartPrice = $(cartPrice).next()
            }
            if (cartPrice.length) priceEl = $(cartPrice)
        }
    }

    else if ($(parent).find('div[class*="price"]').first().length && Shopify && Shopify.theme && Shopify.theme.name && !(Shopify.theme.name.indexOf("Dawn") !== -1)) {
        priceEl = $(parent).find('div[class*="price"]').first();
    }
    // fix for zenmed (madu)
    else if ($(parent).closest('article.collection-product').find('.pricing').length) {
        priceEl = $(parent).closest('article.collection-product').find('.pricing').first();
    }
    //fix for joryhenley by XuTho
    else if ($(parent).hasClass('product-thumb') && $(parent).closest('.collection-products-wrapper').find('.product-thumb-caption-price').length) {
        priceEl = $(parent).closest('.collection-products-wrapper').find('.product-thumb-caption-price');
    }
    //fix for besserernten by Madu
    else if ($(parent).hasClass('product') && $(parent).find('.product__details .product__details__hover .product__price').length) {
        priceEl = $(parent).find('.product__details .product__details__hover .product__price');
    }
    // fix for gemy-maalouf (vitu)
    else if ($(parent).hasClass('grid-product__wrapper') && $(parent).find('.grid-product__price-wrap .grid-product__price').length) {
        priceEl = $(parent).find('.grid-product__price-wrap .grid-product__price');
    }
    // fix for iamwomanboss by XuTho
    else if ($(parent).hasClass('tt-title') && $(parent).closest('.respimgsize').find('.tt-price').length) {
        priceEl = $(parent).closest('.respimgsize').find('.tt-price');
    }
    // fix for fashionlinefactory by XuTho
    else if ($(parent).hasClass('grid-product__content') && $(parent).find('.grid-product__price').length) {
        priceEl = $(parent).find('.grid-product__price');
    }
    //fix for lnchome (mitri)
    else if ($(parent).hasClass('spf-product-card__inner')) {
        let trueParent = $(parent).closest('.spf-product-card');
        if (trueParent.length) {
            priceEl = trueParent.find('.spf-product-card__title').children('a');
        }
    }
    // XuTho fix code compatible theme dawn 2.0
    if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1) {
        if ($(parent).hasClass('card-information__text')) {
            let priceProduct = $(parent).closest('.card-information__wrapper').not('.collage-content__info').find('.price')
            if (priceProduct.length && !priceProduct.prevAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                priceEl = priceProduct
            }
        } else if ($(parent).hasClass('card__heading')) {
            let priceProduct = $(parent).closest('.card__content').find('.price')
            if (priceProduct.length && !priceProduct.prevAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                priceEl = priceProduct
            }
        } else if ($(parent).hasClass('product__info-container')) {
            let priceProduct = $(parent).find('.price')
            if (priceProduct.length && !priceProduct.prevAll().hasClass('bss_pb_img') && !$(parent).closest('.product').find('.product__media-wrapper').find('img').length && !priceProduct.find('.bss_pb_img').length) {
                priceEl = priceProduct
            }
        }
    }
    // fix badge theme Sense by HuyNT
    if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Sense") !== -1) {
        if ($(parent).hasClass('card-information__text')) {
            let priceProduct = $(parent).closest('.card-information__wrapper').find('.price').parent()
            if (priceProduct.length && !priceProduct.prevAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                priceEl = priceProduct
            }
        } else if ($(parent).hasClass('card__heading')) {
            let priceProduct = $(parent).closest('.card__content').find('.price').parent()
            if (priceProduct.length && !priceProduct.prevAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                priceEl = priceProduct
            }
        }
    }

    /** FIX SUPPORT BY STORE ID */
    if (typeof bssFixSupportFindPriceElementForBadgeName == 'function') {
        // eslint-disable-next-line
        priceEl = bssFixSupportFindPriceElementForBadgeName($, BSS_PL, priceEl, parent, page)
    }
    /** END FIX SUPPORT BY STORE ID */

    return priceEl;
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/badge/name/findMainPriceForBadgeName.js
function findMainPriceForBadgeName($, BSS_PL, parent, page) {
    let mainPrice = '';
    
    // Theme Crave
    if ($(parent).closest('.product').find('.price').length && Shopify && Shopify.theme && Shopify.theme.name && !(Shopify.theme.name.indexOf("Dawn") !== -1) && BSS_PL.storeId !== 36318) {
        mainPrice = $(parent).closest('.product').find('.price').first();
    }
    // Theme Debut
    else if ($(parent).closest('.product-single').find('dl[class*="price"]').length) {
        mainPrice = $(parent).closest('.product-single').find('dl[class*="price"]').first();
    }
    // Theme Simple
    else if ($(parent).closest('.grid.product-single').find('.product-single__prices').length) {
        mainPrice = $(parent).closest('.grid.product-single').find('.product-single__prices');
    }
    // Theme Boundless
    else if ($(parent).closest('.product.grid').find('.product__details .product__form--add-to-cart .product__price').length) {
        mainPrice = $(parent).closest('.product.grid').find('.product__details .product__form--add-to-cart');
    }
    // Theme Venture
    else if ($(parent).closest('.grid.product-single').find('.product-single__info-wrapper .product-single__meta-list').length) {
        mainPrice = $(parent).closest('.grid.product-single').find('.product-single__info-wrapper .product-single__meta-list');
    }
    // Theme Supply
    else if ($(parent).hasClass('product__image-wrapper') && $(parent).closest('#ProductSection').find('.grid-item .inline-list.product-meta[data-price]').length) {
        mainPrice = $(parent).closest('#ProductSection').find('.grid-item .inline-list.product-meta[data-price]');
    }
    // Theme Narrative
    else if ($(parent).hasClass('product__media-container') && $(parent).closest('.product-template').find('.product__content .product__price').length) {
        mainPrice = $(parent).closest('.product-template').find('.product__content .product__price');
    }
    // Theme Brooklyn
    else if ($(parent).hasClass('product-single__media') && $(parent).closest('.grid.product-single').find('.product-single__meta .price-container').length) {
        mainPrice = $(parent).closest('.grid.product-single').find('.product-single__meta .price-container');
    }
    // Theme Minimal
    else if ($(parent).parent('.product-single__image-wrapper').length && $(parent).closest('.product-single__hero').find('.product-single__prices').length) {
        mainPrice = $(parent).closest('.product-single__hero').find('.product-single__prices');
    }
    // Theme Express
    else if ($(parent).hasClass('gallery__image-wrapper') && $(parent).closest('.product--template').find('.product__content .price').length) {
        mainPrice = $(parent).closest('.product--template').find('.product__content .price');
    }
    // fix for zenmed (madu)
    else if ($(parent).hasClass('image-container-position') && $(parent).closest('article.product-detail').find('.pricing').length) {
        mainPrice = $(parent).closest('article.product-detail').find('.pricing');
    }
    // fix for jory-henley by XuTho
    else if ($(parent).hasClass('swiper-slide') && $(parent).closest('.product-page-row').find('.product-item-caption-price').length) {
        mainPrice = $(parent).closest('.product-page-row').find('.product-item-caption-price');
    }
    // fix for besserernten (madu)
    else if ($(parent).is('.product-single__photo__item.product-single__photo__item--image') && $(parent).closest('.product-single__bottom').find('.product-single__box').length) {
        mainPrice = $(parent).closest('.product-single__bottom').find('.product-single__box');
    }
    // fix for gemy-maalouf (vitu)
    else if ($(parent).is('.mz-figure.mz-hover-zoom.mz-ready') && $(parent).closest('.grid.product-single').find('.price-container').length) {
        mainPrice = $(parent).closest('.grid.product-single').find('.price-container')
    }
    //fix for gutsygoodness by Vitu
    else if ($(parent).closest('.product_section').find('.current_price').length) {
        mainPrice = $(parent).closest('.product_section').find('.current_price')
    }
    // fix for iamwomanboss by XuTho
    else if ($(parent).closest('#shopify-section-product-template').find('.new-price').length) {
        mainPrice = $(parent).closest('#shopify-section-product-template').find('.new-price');
    }
    // fix for planbee by XuTho
    else if ($(parent).hasClass('rondell-container') && $(parent).closest('.product--container').find('.product-pricing').length) {
        mainPrice = $(parent).closest('.product--container').find('.product-pricing');
    }
    // fix for alurehomedecor by XuTho
    else if ($(parent).hasClass('aspect-ratio') && $(parent).closest('.product-block-list').find('.product-meta__reference').length) {
        mainPrice = $(parent).closest('.product-block-list').find('.product-meta__reference');
    }
    //fix label compatible with Beae - Pgage builder by tungnk
    else if (window.location.pathname.includes("/page") && $(".beae-builder") && $(".beae-builder").length) {
        mainPrice = $(parent).find(".beae-product-single__price").parent()
    }
    // fix for fashionlinefactory by XuTho
    else if (($(parent).hasClass('product__main-photos') || $(parent).hasClass('image-wrap')) && $(parent).closest('.grid--product-images--partial').find('.product-single__sku').length && BSS_PL.storeId !== 23186) {
        mainPrice = $(parent).closest('.grid--product-images--partial').find('.product-single__sku');
    }
    
    // XuTho fix code compatible theme dawn 2.0
    if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1) {
        if ($(parent).hasClass('product__media')) {
            let priceProduct = $(parent).closest('.product').find('.price').parent()
            if (priceProduct.length && !priceProduct.prevAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                mainPrice = priceProduct;
            }
        } else if ($(parent).hasClass('card-information__text')) {
            let priceProduct = $(parent).parent().find('span.price')
            if (priceProduct.length && !priceProduct.prevAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                mainPrice = priceProduct
            }
        }
    }
    // fix badge theme Refresh, Sense, Taste, Studio, Crave, Craft by HuyNT
    if (Shopify && Shopify.theme && Shopify.theme.name &&
        (Shopify.theme.name.indexOf("Refresh") !== -1 ||
            Shopify.theme.name.indexOf("Colorblock") !== -1 ||
            Shopify.theme.name.indexOf("Sense") !== -1 ||
            Shopify.theme.name.indexOf("Taste") !== -1 ||
            Shopify.theme.name.indexOf("Studio") !== -1 ||
            Shopify.theme.name.indexOf("Crave") !== -1 ||
            Shopify.theme.name.indexOf("Ride") !== -1 ||
            Shopify.theme.name.indexOf("Craft") !== -1 ||
            Shopify.theme.name.indexOf("Origin") !== -1 ||
            Shopify.theme.name.indexOf("Publisher") !== -1
        )) {
        if ($(parent).hasClass('product__media')) {
            let priceProduct = $(parent).closest('.product').find('.price').parent();
            if (priceProduct.length && !priceProduct.prevAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                mainPrice = priceProduct;
            }
        }
        else if ($(parent).hasClass('product__modal-opener')) {
            let priceProduct = $(parent).closest('.product').find('.price').parent();
            if (priceProduct.length && !priceProduct.prevAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                mainPrice = priceProduct;
            }
        }
        else if ($(parent).hasClass('product__info-container')) {
            let priceProduct = $(parent).find('.price').parent();
            if (priceProduct.length && !priceProduct.prevAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                mainPrice = priceProduct;
            }
        }
        else if ($(parent).hasClass('product__title')) {
            let priceProduct = $(parent).closest('.product__info-container').find('.price').parent();
            if (priceProduct.length && !priceProduct.prevAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                mainPrice = priceProduct;
            }
        }
    }

    /** FIX SUPPORT BY STORE ID */
    if(typeof bssFixSupportFindMainPriceForBadgeName == 'function'){
        // eslint-disable-next-line
        mainPrice = bssFixSupportFindMainPriceForBadgeName($, mainPrice, parent, page)
    }
    /** END FIX SUPPORT BY STORE ID */

    return mainPrice;
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/badge/price/findPriceElementForBadgePrice.js
function findPriceElementForBadgePrice($, BSS_PL, parent, page) {
    let priceEl = '';
    // For Express theme
    if ($(parent).hasClass('product-card__price-wrapper') || $(parent).find('.product-card__price-wrapper').length) {
        if ($(parent).find('.product-card__price-wrapper').length) {
            priceEl = $(parent).find('.product-card__price-wrapper');
        } else {
            priceEl = $(parent);
        }
    }
    // Fix for feature product express
    else if ($(parent).hasClass('product__gallery') || $(parent).closest('section.product').find('.product__content .price').length) {
        priceEl = $(parent).closest('section.product').find('.product__content .price');
    }
    // For feature product Dawn Theme
    else if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1) {
        if ($(parent).parent().parent().hasClass('featured-product')) {
            priceEl = $(parent).find('.price');
        }
    }
    // For Simple theme
    else if ($(parent).hasClass('product__title') && $(parent).parent().find('.product__prices').length) {
        priceEl = $(parent).parent().find('.product__prices');
    }
    // Theme Venture
    else if ($(parent).closest('.grid.product-single').find('.product-single__info-wrapper .product-single__meta-list').length) {
        priceEl = $(parent).closest('.grid.product-single').find('.product-single__info-wrapper .product-single__meta-list');
    }
    // if out of stock then not append
    else if ($(parent).hasClass('grid__item') && $(parent).find('.product-card .product-card__availability').length) {
        // appended = true;
    }
    // For supply
    else if ($(parent).attr('itemprop') == "offers" && $(parent).find('.inline-list.product-meta').length) {
        priceEl = $(parent).find('.inline-list.product-meta');
    }
    // For Boundless theme
    else if ($(parent).hasClass('product-item__link-wrapper') && $(parent).find('.product-item__meta .product-item__price-wrapper').length) {
        priceEl = $(parent).find('.product-item__meta .product-item__price-wrapper');
    } else if ($(parent).hasClass('featured-product__photo') && $(parent).closest('.product.featured-product').find('.featured-product__details .product__price').length) {
        priceEl = $(parent).closest('.product.featured-product').find('.featured-product__details .product__price');
    }
    // For Minimal theme
    else if ($(parent).hasClass('product__img-wrapper') && $(parent).closest('.grid__item').find('a .grid-link__meta').length) {
        priceEl = $(parent).closest('.grid__item').find('a .grid-link__meta');
    }
    // Narrative feature product
    else if ($(parent).hasClass('product-media--featured-product') && $(parent).closest('.featured-product__wrapper').find('.featured-product__content-column .product__price').length) {
        priceEl = $(parent).closest('.featured-product__wrapper').find('.featured-product__content-column .product__price');
    }
    //fix label compatible with Beae - Pgage builder by tungnk
    else if (window.location.pathname.includes("/page") && $(".beae-builder") && $(".beae-builder").length) {
        priceEl = $(parent).closest(".beae-products-item--information-wrapper").find(".core__microelement--price")
    }
    // For debut & common theme
    else if ($(parent).find('dl[class*="price"]').first().length) {
        priceEl = $(parent).find('dl[class*="price"]').first();
    } else if ($(parent).find('div[class*="price"]').first().length && !($(parent).hasClass('product__info-container') && page == 'products')) {
        priceEl = $(parent).find('div[class*="price"]').first();
    }
    // fix for zenmed (madu)
    else if ($(parent).closest('article.collection-product').find('.pricing').length) {
        priceEl = $(parent).closest('article.collection-product').find('.pricing').first();
    }
    //fix for besserernten by Madu
    else if ($(parent).hasClass('product') && $(parent).find('.product__details .product__details__hover .product__price').length) {
        priceEl = $(parent).find('.product__details .product__details__hover .product__price');
    }
    // fix for gemy-maalouf (vitu)
    //fix for gwstore by tungnk
    else if ($(parent).hasClass('grid-product__wrapper') && $(parent).find('.grid-product__price-wrap .grid-product__price').length && BSS_PL.storeId != 28152) {
        priceEl = $(parent).find('.grid-product__price-wrap .grid-product__price');
    }
    // fix for edmonton-rv by vitu
    else if ($(parent).hasClass('product-galley--image-background') && $(parent).closest('.product--outer').find('.product-pricing').length && BSS_PL.storeId != 7891) {
        priceEl = $(parent).closest('.product--outer').find('.product-pricing');
    }
    //fix for toti-royal by vitu
    else if ($(parent).hasClass('AspectRatio AspectRatio--withFallback') && $(parent).closest('.Product__Wrapper').find('.ProductMeta__PriceList.Heading').length && BSS_PL.storeId != 34038) {
        priceEl = $(parent).closest('.Product__Wrapper').find('.ProductMeta__PriceList.Heading');
    }

    else if ($(parent).hasClass('product-media--image')) {
        let trueParent = $(parent).closest('.light-space-above');
        if (trueParent.length) {
            priceEl = trueParent.find('.current-price');
        }
    }

    //fix for lnchome (mitri)
    else if ($(parent).hasClass('spf-product-card__inner')) {
        let trueParent = $(parent).closest('.spf-product-card');
        if (trueParent.length) {
            priceEl = trueParent.find('.spf-product__info');
        }
    }
    // XuTho fix code compatible theme dawn 2.0
    if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1) {
        if ($(parent).hasClass('card-information__text')) {
            let priceProduct = $(parent).closest('.card-wrapper').find('.price')
            if (priceProduct.length && !priceProduct.nextAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                priceEl = priceProduct
            }
        } else if ($(parent).hasClass('card__text')) {
            let priceProduct = $(parent).closest('.card-wrapper').find('.price')
            if (priceProduct.length && !priceProduct.nextAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                priceEl = priceProduct
            }
        } else if ($(parent).hasClass('card__heading')) {
            let priceProduct = $(parent).closest('.card__content').find('.price')
            if (priceProduct.length && !priceProduct.nextAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                priceEl = priceProduct
            }
        } else if ($(parent).hasClass('product__info-container')) {
            let priceProduct = $(parent).find('.price')
            if (priceProduct.length && !priceProduct.find('.bss_pb_img').length) {
                priceEl = priceProduct
            }
        }
    }
    // fix code compatible theme Refresh by HuyNT, tungnk
    if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Refresh") !== -1) {
        if ($(parent).hasClass('card__heading')) {
            let priceProduct = $(parent).closest('.card__information').find('.price')
            if (priceProduct.length && !priceProduct.nextAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                priceEl = priceProduct
            }
        }
    }
    // fix code compatible theme Sense by HuyNT
    if (Shopify && Shopify.theme && Shopify.theme.name && (Shopify.theme.name.includes("Sense") || Shopify.theme.name.includes("Craft"))) {
        if ($(parent).hasClass('card__heading')) {
            let priceProduct = $(parent).closest('.card-wrapper').find('.price')
            if (priceProduct.length && !priceProduct.nextAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                priceEl = priceProduct
            }
        }
    }
    
    /** FIX SUPPORT BY STORE ID */
    if (typeof bssFixSupportPriceElementForBadgePrice == 'function') {
        // eslint-disable-next-line
        priceEl = bssFixSupportPriceElementForBadgePrice($, parent, page, priceEl)
    }
    /** END FIX SUPPORT BY STORE ID */
    
    return priceEl;
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/badge/price/findMainPriceForBadgePrice.js
function findMainPriceForBadgePrice($, BSS_PL, parent, page) {
    let mainPrice = '';
    // XuTho fix code compatible theme dawn 2.0
    if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1) {
        if ($(parent).hasClass('card-information__text')) {
            let priceProduct = $(parent).closest('.collage-content').find('span.price')
            if (priceProduct.length && !priceProduct.nextAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                mainPrice = priceProduct
            }
        }
    }
    // Theme Debut
    else if ($(parent).closest('.product-single').find('dl[class*="price"]').length) {
        mainPrice = $(parent).closest('.product-single').find('dl[class*="price"]').first();
    }
    // Theme Simple
    else if ($(parent).closest('.grid.product-single').find('.product-single__prices').length) {
        mainPrice = $(parent).closest('.grid.product-single').find('.product-single__prices');
    }
    // Theme Boundless
    else if ($(parent).closest('.product.grid').find('.product__details .product__form--add-to-cart .product__price').length) {
        mainPrice = $(parent).closest('.product.grid').find('.product__details .product__form--add-to-cart .product__price');
    }
    // Theme Supply
    else if ($(parent).hasClass('product__image-wrapper') && $(parent).closest('#ProductSection').find('.grid-item .inline-list.product-meta[data-price]').length) {
        mainPrice = $(parent).closest('#ProductSection').find('.grid-item .inline-list.product-meta[data-price]');
    }
    // Theme Narrative
    else if ($(parent).hasClass('product__media-container') && $(parent).closest('.product-template').find('.product__content .product__price').length) {
        mainPrice = $(parent).closest('.product-template').find('.product__content .product__price');
    }
    // Theme Brooklyn
    else if ($(parent).hasClass('product-single__media') && $(parent).closest('.grid.product-single').find('.product-single__meta .price-container').length) {
        mainPrice = $(parent).closest('.grid.product-single').find('.product-single__meta .price-container');
    }
    // Theme Minimal
    else if ($(parent).parent('.product-single__image-wrapper').length && $(parent).closest('.product-single__hero').find('.product-single__prices').length) {
        mainPrice = $(parent).closest('.product-single__hero').find('.product-single__prices');
    }
    // Theme Express
    else if ($(parent).hasClass('gallery__image-wrapper') && $(parent).closest('.product--template').find('.product__content .price').length) {
        mainPrice = $(parent).closest('.product--template').find('.product__content .price');
    }
    // Theme Spotlight
    else if (($(parent).hasClass('card__heading') || $(parent).hasClass('product__title')) && $(parent).parent().find('.price').length) {
        mainPrice = $(parent).parent().find('.price')
    } else if ($(parent).hasClass('product__info-container')) {
        mainPrice = $(parent).find('.price')
    }
    //fix label compatible with Beae - Pgage builder by tungnk
    else if (window.location.pathname.includes("/page") && $(".beae-builder") && $(".beae-builder").length) {
        mainPrice = $(parent).find(".beae-product-single__price").parent()
    }
    // fix for zenmed (madu)
    else if ($(parent).hasClass('image-container-position') && $(parent).closest('article.product-detail').find('.pricing').length) {
        mainPrice = $(parent).closest('article.product-detail').find('.pricing');
    }
    // fix for besserernten (madu)
    else if ($(parent).is('.product-single__photo__item.product-single__photo__item--image') && $(parent).closest('.product-single__bottom').find('.product-single__price').length) {
        mainPrice = $(parent).closest('.product-single__bottom').find('.product-single__price');
    }
    // fix for gemy-maalouf (vitu)
    else if ($(parent).is('.mz-figure.mz-hover-zoom.mz-ready') && $(parent).closest('.grid.product-single').find('.price-container').length) {
        mainPrice = $(parent).closest('.grid.product-single').find('.price-container')
    }
    //fix for gutsygoodness by Vitu
    else if ($(parent).closest('.product_section').find('.current_price').length) {
        mainPrice = $(parent).closest('.product_section').find('.current_price')
    }
    // fix for brantford by XuTho
    else if ($(parent).hasClass('aspect-ratio') && $(parent).closest('.product-block-list').find('.price').length) {
        mainPrice = $(parent).closest('.product-block-list').find('.price');
    }
    // fix for lnchome (mitri)
    else if ($(parent).hasClass('product__main-photos') && BSS_PL.storeId !== 12119) {
        let trueParent = $(parent).closest('.grid');
        if (trueParent.length) {
            mainPrice = trueParent.find('.money').last();
        }
    }

    // fix badge compatible theme Refresh, Sense, Craft, Ride, Taste, Studio, Crave, Colorblock by HuyNT
    if (Shopify && Shopify.theme && Shopify.theme.name &&
        (Shopify.theme.name.indexOf("Refresh") !== -1 ||
            Shopify.theme.name.indexOf("Sense") !== -1 ||
            Shopify.theme.name.indexOf("Craft") !== -1 ||
            Shopify.theme.name.indexOf("Ride") !== -1 ||
            Shopify.theme.name.indexOf("Taste") !== -1 ||
            Shopify.theme.name.indexOf("Studio") !== -1 ||
            Shopify.theme.name.indexOf("Crave") !== -1 ||
            Shopify.theme.name.indexOf("Colorblock") !== -1 ||
            Shopify.theme.name.indexOf("Origin") !== -1 ||
            Shopify.theme.name.indexOf("Publisher") !== -1
        )) {
        if ($(parent).hasClass('product__media')) {
            let priceProduct = $(parent).closest('.product').find('.price').parent();
            if (priceProduct.length && !priceProduct.nextAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                mainPrice = priceProduct;
            }
        }
        else if ($(parent).hasClass('product__modal-opener')) {
            let priceProduct = $(parent).closest('.product').find('.price').parent();
            if (priceProduct.length && !priceProduct.nextAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                mainPrice = priceProduct;
            }
        }
        else if ($(parent).hasClass('product__info-container')) {
            let priceProduct = $(parent).find('.price').parent();
            if (priceProduct.length && !priceProduct.nextAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                mainPrice = priceProduct;
            }
        }
        else if ($(parent).hasClass('product__title')) {
            let priceProduct = $(parent).closest('.product__info-container').find('.price').parent();
            if (priceProduct.length && !priceProduct.nextAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                mainPrice = priceProduct;
            }
        }
        else if ($(parent).hasClass('card__heading')) {
            let priceProduct = $(parent).closest('.card__information').find('.price');
            if (priceProduct.length && !priceProduct.nextAll().hasClass('bss_pb_img') && !priceProduct.find('.bss_pb_img').length) {
                mainPrice = priceProduct;
            }
        }
    }
    
    /** FIX SUPPORT BY STORE ID */
    if (typeof bssFixSupportMainPriceForBadgePrice == 'function') {
        // eslint-disable-next-line
        mainPrice = bssFixSupportMainPriceForBadgePrice($, parent, page, mainPrice)
    }
    /** END FIX SUPPORT BY STORE ID */
    
    return mainPrice;
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/badge/addToCart/findMainClassForBadgeAddToCart.js
// eslint-disable-next-line
function findMainClassForBadgeAddToCart($, BSS_PL, parent, page) {
    let mainClassForAddToCart = '';

    // For Dawn theme
    if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1) {
        if ($(parent).hasClass('product__media')) {
            let addToCartBtn = $(parent).closest('.product').find('.product-form__submit')
            if (addToCartBtn.length && !addToCartBtn.prevAll().hasClass('bss_pb_img') && !addToCartBtn.find('.bss_pb_img').length) {
                mainClassForAddToCart = addToCartBtn;
            }
        } else if ($(parent).hasClass('product__info-container')) {
            let addToCartBtn = $(parent).parent().find('.product-form__submit')
            if (addToCartBtn.length && !addToCartBtn.prevAll().hasClass('bss_pb_img') && !addToCartBtn.find('.bss_pb_img').length) {
                mainClassForAddToCart = addToCartBtn
            }
        }
    }

    // For Refresh, Sense, Taste, Studio, Crave, Craft, Origin, Publisher, Colorblock theme
    if (Shopify && Shopify.theme && Shopify.theme.name &&
        (Shopify.theme.name.indexOf("Refresh") !== -1 ||
            Shopify.theme.name.indexOf("Colorblock") !== -1 ||
            Shopify.theme.name.indexOf("Sense") !== -1 ||
            Shopify.theme.name.indexOf("Taste") !== -1 ||
            Shopify.theme.name.indexOf("Studio") !== -1 ||
            Shopify.theme.name.indexOf("Crave") !== -1 ||
            Shopify.theme.name.indexOf("Ride") !== -1 ||
            Shopify.theme.name.indexOf("Origin") !== -1 ||
            Shopify.theme.name.indexOf("Publisher") !== -1 ||
            Shopify.theme.name.indexOf("Craft") !== -1
        )) {
        if ($(parent).hasClass('product__modal-opener')) {
                let addToCartBtn = $(parent).closest('.product').find('.product-form__submit')
                if (addToCartBtn.length && !addToCartBtn.prevAll().hasClass('bss_pb_img') && !addToCartBtn.find('.bss_pb_img').length) {
                    mainClassForAddToCart = addToCartBtn;
                }
        }
        else if ($(parent).hasClass('product__media')) {
            let addToCartBtn = $(parent).closest('.product').find('.product-form__submit')
            if (addToCartBtn.length && !addToCartBtn.prevAll().hasClass('bss_pb_img') && !addToCartBtn.find('.bss_pb_img').length) {
                mainClassForAddToCart = addToCartBtn;
            }
        }
        else if ($(parent).hasClass('product__info-container')) {
            let addToCartBtn = $(parent).parent().find('.product-form__submit')
            if (addToCartBtn.length && !addToCartBtn.prevAll().hasClass('bss_pb_img') && !addToCartBtn.find('.bss_pb_img').length) {
                mainClassForAddToCart = addToCartBtn;
            }
        }
        else if ($(parent).hasClass('product__title')) {
            let addToCartBtn = $(parent).closest('.product__info-container').find('.product-form__submit')
            if (addToCartBtn.length && !addToCartBtn.prevAll().hasClass('bss_pb_img') && !addToCartBtn.find('.bss_pb_img').length) {
                mainClassForAddToCart = addToCartBtn;
            }
        }
    }
    
    /** FIX SUPPORT BY STORE ID */
    if (typeof bssFixSupportMainClassForAddToCart == 'function') {
        // eslint-disable-next-line
        mainClassForAddToCart = bssFixSupportMainClassForAddToCart($, parent, page, mainClassForAddToCart)
    }
    /** END FIX SUPPORT BY STORE ID */
    return mainClassForAddToCart;
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/badge/addToCart/findElementClassForBadgeAddToCart.js
// eslint-disable-next-line
function findElementClassForBadgeAddToCart($, BSS_PL, parent, page) {
    let addToCartBtnEl = '';
    return addToCartBtnEl;
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/badge/buyItNow/findMainClassForBadgeBuyItNow.js
// eslint-disable-next-line
function findMainClassForBadgeBuyItNow($, BSS_PL, parent, page) {
    let mainClassForBuyItNow = '';

    // For Dawn theme
    if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1) {
        if ($(parent).hasClass('product__media')) {
            let buyItNowBtn = $(parent).closest('.product').find('div.shopify-payment-button')
            if (buyItNowBtn.length && !buyItNowBtn.nextAll().hasClass('bss_pb_img') && !buyItNowBtn.find('.bss_pb_img').length) {
                mainClassForBuyItNow = buyItNowBtn;
            }
        } else if ($(parent).hasClass('product__info-container')) {
            let buyItNowBtn = $(parent).parent().find('div.shopify-payment-button')
            if (buyItNowBtn.length && !buyItNowBtn.nextAll().hasClass('bss_pb_img') && !buyItNowBtn.find('.bss_pb_img').length) {
                mainClassForBuyItNow = buyItNowBtn
            }
        }
    }

    // For Refresh, Sense, Taste, Studio, Crave, Craft, Origin, Publisher, Colorblock theme
    if (Shopify && Shopify.theme && Shopify.theme.name &&
        (Shopify.theme.name.indexOf("Refresh") !== -1 ||
            Shopify.theme.name.indexOf("Colorblock") !== -1 ||
            Shopify.theme.name.indexOf("Sense") !== -1 ||
            Shopify.theme.name.indexOf("Taste") !== -1 ||
            Shopify.theme.name.indexOf("Studio") !== -1 ||
            Shopify.theme.name.indexOf("Crave") !== -1 ||
            Shopify.theme.name.indexOf("Ride") !== -1 ||
            Shopify.theme.name.indexOf("Origin") !== -1 ||
            Shopify.theme.name.indexOf("Publisher") !== -1 ||
            Shopify.theme.name.indexOf("Craft") !== -1
        )) {
        if ($(parent).hasClass('product__modal-opener')) {
            mainClassForBuyItNow = $(parent).closest('.product').find('div.shopify-payment-button')
        }
        else if ($(parent).hasClass('product__media')) {
            mainClassForBuyItNow = $(parent).closest('.product').find('div.shopify-payment-button')
        }
        else if ($(parent).hasClass('product__info-container')) {
            mainClassForBuyItNow = $(parent).parent().find('div.shopify-payment-button')
        }
        else if ($(parent).hasClass('product__title')) {
            mainClassForBuyItNow = $(parent).closest('.product__info-container').find('div.shopify-payment-button')
        }
    }
    // fix prakriti-restoring-balance by vani
    else if (BSS_PL.storeId === 32639 && $(parent).hasClass('image-wrap')) {
        let badge = $(parent).closest('.page-width').find('.grid__item div.shopify-payment-button');
        if (badge.length && (!badge.parent().find('.bss_pb_img').length)) {
            mainClassForBuyItNow = badge;
        }
    }
    else if (BSS_PL.storeId === 35277 && $(parent).hasClass('logo__img')) {
        let badge = $(parent).closest('.container').find('#flo-buy-now-btn');
        if (badge.length && (!badge.parent().find('.bss_pb_img').length)) {
            mainClassForBuyItNow = badge;
        }
    }
    return mainClassForBuyItNow;
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/badge/buyItNow/findElementClassForBadgeBuyItNow.js
// eslint-disable-next-line
function findElementClassForBadgeBuyItNow($, BSS_PL, parent, page) {
    let buyItNowEl = '';
    // For Refresh, Sense, Taste, Studio, Crave, Craft theme
    if (Shopify && Shopify.theme && Shopify.theme.name &&
        (Shopify.theme.name.indexOf("Refresh") !== -1 ||
            Shopify.theme.name.indexOf("Colorblock") !== -1 ||
            Shopify.theme.name.indexOf("Sense") !== -1 ||
            Shopify.theme.name.indexOf("Taste") !== -1 ||
            Shopify.theme.name.indexOf("Studio") !== -1 ||
            Shopify.theme.name.indexOf("Crave") !== -1 ||
            Shopify.theme.name.indexOf("Ride") !== -1 ||
            Shopify.theme.name.indexOf("Craft") !== -1
        )) {
        if ($(parent).hasClass('product__modal-opener')) {
                let buyItNowBtn = $(parent).closest('.product').find('.shopify-payment-button__button')
                if (buyItNowBtn.length && !buyItNowBtn.prevAll().hasClass('bss_pb_img') && !buyItNowBtn.find('.bss_pb_img').length) {
                    buyItNowEl = buyItNowBtn;
                }
        }
        else if ($(parent).hasClass('product__media')) {
            let buyItNowBtn = $(parent).closest('.product').find('.shopify-payment-button__button')
            if (buyItNowBtn.length && !buyItNowBtn.prevAll().hasClass('bss_pb_img') && !buyItNowBtn.find('.bss_pb_img').length) {
                buyItNowEl = buyItNowBtn;
            }
        }
        else if ($(parent).hasClass('product__info-container')) {
            let buyItNowBtn = $(parent).find('.product-form__buttons').find('div.shopify-payment-button')
            if (buyItNowBtn.length && !buyItNowBtn.prevAll().hasClass('bss_pb_img') && !buyItNowBtn.find('.bss_pb_img').length) {
                buyItNowEl = buyItNowBtn;
            }
        }
        else if ($(parent).hasClass('product__title')) {
            let buyItNowBtn = $(parent).closest('.product__info-container').find('.shopify-payment-button__button')
            if (buyItNowBtn.length && !buyItNowBtn.prevAll().hasClass('bss_pb_img') && !buyItNowBtn.find('.bss_pb_img').length) {
                buyItNowEl = buyItNowBtn;
            }
        }
    }
    return buyItNowEl;
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/badge/quantityBox/findMainClassForBadgeQtyBox.js
// eslint-disable-next-line
function findMainClassForBadgeQtyBox($, BSS_PL, parent, page) {
    let mainClassForQtyBox = '';

    // For Dawn theme
    if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1) {
        if ($(parent).hasClass('product__media')) {
            let quantityBox = $(parent).closest('.product').find('.quantity')
            if (quantityBox.length && !quantityBox.prevAll().hasClass('bss_pb_img') && !quantityBox.find('.bss_pb_img').length) {
                mainClassForQtyBox = quantityBox;
            }
        } else if ($(parent).hasClass('product__info-container')) {
            let quantityBox = $(parent).parent().find('.quantity')
            if (quantityBox.length && !quantityBox.prevAll().hasClass('bss_pb_img') && !quantityBox.find('.bss_pb_img').length) {
                mainClassForQtyBox = quantityBox
            }
        }
    }

    // For Refresh, Sense, Taste, Studio, Crave, Craft, Origin, Publisher, Colorblock theme
    if (Shopify && Shopify.theme && Shopify.theme.name &&
        (Shopify.theme.name.indexOf("Refresh") !== -1 ||
            Shopify.theme.name.indexOf("Colorblock") !== -1 ||
            Shopify.theme.name.indexOf("Sense") !== -1 ||
            Shopify.theme.name.indexOf("Taste") !== -1 ||
            Shopify.theme.name.indexOf("Studio") !== -1 ||
            Shopify.theme.name.indexOf("Crave") !== -1 ||
            Shopify.theme.name.indexOf("Ride") !== -1 ||
            Shopify.theme.name.indexOf("Origin") !== -1 ||
            Shopify.theme.name.indexOf("Publisher") !== -1 ||
            Shopify.theme.name.indexOf("Craft") !== -1
        )) {
        if ($(parent).hasClass('product__info-container')) {
            let quantityBox = $(parent).find('.quantity__button').parent()
            if (quantityBox.length && !quantityBox.nextAll().hasClass('bss_pb_img') && !quantityBox.find('.bss_pb_img').length) {
                mainClassForQtyBox = quantityBox;
            }
        }
    }
    
    /** FIX SUPPORT BY STORE ID */
    if(typeof bssFixSupportMainClassForQtyBox == 'function'){
        // eslint-disable-next-line
        mainClassForQtyBox = bssFixSupportMainClassForQtyBox($, mainClassForQtyBox, parent, page)
    }
    /** END FIX SUPPORT BY STORE ID */

    return mainClassForQtyBox;
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/badge/quantityBox/findElementClassForBadgeQtyBox.js
// eslint-disable-next-line
function findElementClassForBadgeQtyBox($, BSS_PL, parent, page) {
    let quantityBoxEl = '';
    return quantityBoxEl;
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/badge/fixBugForBadgeImage.js
function fixBugForBadgeImage($, BSS_PL, parent, page, htmlLabel) {
    let appended = false;
    if ($(parent).hasClass('product-item__link-wrapper')) {
        if ($(parent).find('.product-item__image-container').length) {
            $(parent).find('.product-item__image-container').after(htmlLabel);
            appended = true;
        } else {
            $(parent).find('img').wrap('<div class="product-item__image-container"></div>');
            $(parent).find('.product-item__image-container').after(htmlLabel);
            appended = true;
        }
    }
    // Theme Boundless feature product
    else if ($(parent).is('.product__photo.featured-product__photo') && page == '' && $(parent).find('.featured-product__photo-wrapper .product__photo--single').length) {
        $(parent).find('.featured-product__photo-wrapper .product__photo--single').first().after(htmlLabel);
        appended = true;
    }
    // Fix feature product for all free theme by NhatHN
    else if ($(parent).closest('.featured-product').length) {
        let parent2;
        if(Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Sense") !== -1){
            parent2 = $(parent).closest('.featured-product').find('.product-media-container');
        } else{
            parent2 = $(parent).closest('.featured-product').find('.product__media-item');
        }
        if (!$(parent2).find('.bss_pb_img').length) {
            $(parent2).append(htmlLabel);
            appended = true;
        }   
    }
    // Fix for Feature product theme Brooklyn feature product
    else if ($(parent).is('.grid__item.product-single__meta--wrapper') && page == '' && $(parent).closest('.grid.product-single').find('.product-single__media-wrapper .product-single__media').length) {
        $(parent).closest('.grid.product-single').find('.product-single__media-wrapper .product-single__media').after(htmlLabel);
        appended = true;
    }
    // Theme Venture
    else if ($(parent).hasClass('grid__item') && $(parent).find('.product-card__image-container .product-card__image').length) {
        $(parent).find('.product-card__image-container .product-card__image').after(htmlLabel);
        $(parent).find('.product-card__image-container').css('margin-bottom', '0px');
        $(parent).find('.product-card__info').css('position', 'relative');
        appended = true;
    }

    // Theme Supply
    else if ($(parent).hasClass('grid-item') && $(parent).find('.product-grid-image .lazyload__image-wrapper').length) {
        $(parent).find('.product-grid-image .lazyload__image-wrapper').after(htmlLabel);
        appended = true;
    }
    // Theme Express
    else if ($(parent).is('.product-card') && $(parent).find('.product-card__link .product-card__image-wrapper').length) {
        let old_html = $(parent).find('.product-card__link .product-card__image-wrapper').html();
        let currentClass = $(parent).find('.product-card__link .product-card__image-wrapper').attr('class');
        let new_html = "<div class=" + currentClass + ">" + old_html + "</div>";
        $(parent).find('.product-card__link .product-card__image-wrapper').html(new_html).removeAttr('class');

        $(parent).find('.product-card__link .product-card__image-wrapper').after(htmlLabel);
        appended = true;
    }
    //fix label compatible with Beae - Pgage builder by tungnk
    else if (window.location.pathname.includes("/page") && $(".beae-builder") && $(".beae-builder").length) {
        if ($(parent).hasClass("beae-product-form")) {
            let badge = $(parent).find(".beae-product-single__media--featured");
            if (badge.length && !badge.find('.bss_pb_img').length) {
                badge.append(htmlLabel);
                appended = true;
            }
        }
        if ($(parent).hasClass("core__micro--wrapper")) {
            let badge = $(parent).closest(".beae-product-item--wrapper").find(".beae-product-media")
            if (badge.length && !badge.parent().find('.bss_pb_img').length) {
                badge.after(htmlLabel)
                appended = true;
            }
        }
    }
    else if (BSS_PL.storeId == 35851) {
        if ((page == "collections" || page == "") && $(parent).hasClass("product-grid-item__container")) {
            $(parent).after(htmlLabel)
            appended = true
        }
        if (window.location.pathname == '/search') {
            if ($(parent).hasClass("search__item__generic__image")) {
                $(parent).find("a").after(htmlLabel)
                appended = true
            } else {
                appended = true
            }
        }
        if (page == "products" && $(parent).hasClass("lazy-image")) {
            let image = $(parent).closest(".product__grid")
            if (image.length && !image.parent().find(".bss_pb_img").length) {
                $(image).after(htmlLabel)
                appended = true
            }
        }
    }
    // Fix for oddgoods (by madu)
    else if ($(parent).hasClass('rimage-wrapper') && page == 'products') {
        let firstEl = $(parent).closest('.product-detail__images').find('.rimage-wrapper').first();
        if (firstEl.find('.bss_pb_img').length == 0) {
            firstEl.after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).find('.product-card__image-with-placeholder-wrapper').length) {
        $(parent).find('.product-card__image-with-placeholder-wrapper').after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-single__media')) {
        // Fixed product slide for Debut theme
        // check if there is thumbnail slider
        let $beforeThumbnail = $(parent).closest('.product-single__media-group').find('div[data-thumbnail-slider]');
        if ($(parent).closest('.product-single__media-group').length && $beforeThumbnail.length) {
            if (!$beforeThumbnail.prev('.bss_pb_img').length) {
                $beforeThumbnail.before(htmlLabel);
                appended = true;
            }
        } else if ($(parent).parent().hasClass('product-single__media-wrapper')) {
            $(parent).after(htmlLabel);
            appended = true;
        }
    }
    else if ($(parent).hasClass('product-single__photo') && !$(parent).parent().hasClass('photos__item photos__item--main')) {
        // Fixed product slide for Debut theme - old version
        if ($(parent).parent().hasClass('product-single__photo-wrapper')) {
            $(parent).after(htmlLabel);
            appended = true;
        }
        // fix lable for gloriabazar
        let correctElement = $(parent).parent().parent();
        if (correctElement.hasClass('slick-list') && !correctElement.children().hasClass('bss_pb_img')) {
            correctElement.after(htmlLabel)
            appended = true;
        }

    } else if ($(parent).hasClass('product-single__photos')) {
        // Fixed bug product galleries on product page for fineradioshop
        if ($(parent).parent().hasClass('product-single__featured-image-wrapper')) {
            $(parent).after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('featured-product__photo')) {
        //Fix for featured product on Boundless theme
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product__photo-wrapper') && $(parent).hasClass('product__photo-wrapper-product-template')) {
        //Fix on product page venture theme
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('grid-product__image-wrapper')) {
        //Fix bugs for brooklyn theme, labels at footer with incorrect position
        if ($(parent).find('.product--wrapper').length) {
            $(parent).find('.product--wrapper').after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('product__gallery')) {
        //Fix for featured product on home page of Express Theme
        if (!$(parent).next('.bss_pb_img').length) {
            $(parent).after(htmlLabel);
        }
        appended = true;
    } else if ($(parent).hasClass('product-card--list')) {
        //Fix for featured collection at home page of Express theme
        if ($(parent).find('.product-card__image-wrapper').length) {
            $(parent).find('.product-card__image-wrapper').after(htmlLabel);
            appended = true;
        }

    } else if ($(parent).hasClass('product-media--featured-product')) {
        // Fix for featured product of Narrative theme
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('card') && $(parent).hasClass('critical-clear')) {
        // Fix for collection products of Narrative theme
        $(parent).find('.card__image-wrapper').after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('grid-item') && $(parent).find('.product-grid-image--centered').length) {
        //Fix for collection products of Supply theme
        let supplyThemeProductElement = $(parent).find('.product-grid-image--centered');
        supplyThemeProductElement.css('position', 'relative');
        supplyThemeProductElement.after(htmlLabel);
        appended = true;
    } else if ($(parent).attr('itemprop') == "offers") {
        if ($('.grid-item .no-js.product__image-wrapper').length) {
            //Fix bugs for featured product on Supply Theme
            $(parent).closest('.grid').find('.grid-item .product-photo-container .no-js.product__image-wrapper').first().after(htmlLabel);
        } else if ($('.product-single__hero .grid__item .product-single__photos').length) {
            //Fix bugs for featured product on Minimal Theme
            $('.product-single__hero .grid__item .product-single__photos').css('position', 'relative').after(htmlLabel);
        }

        appended = true;
    } else if ($(parent).hasClass('product__img-wrapper')) {
        // Fix for minimal theme on home page
        $(parent).after(htmlLabel);
        appended = true;
    }
    // handle the parent closest to the cart form (in cart page)
    else if ($(parent).closest('form[action*="/cart"]').length && !$(parent).closest('#CartDrawer').length) {
        const cartMedia = $(parent).closest('[class*="cart"][class*="media"]');
        if (cartMedia.length && !$(cartMedia).parent().find('.bss_pb_img').length) {
            $(cartMedia).after(htmlLabel);
            appended = true;
        }
    }
    else if ($(parent).hasClass('product-single__photo-wrapper') && $(parent).parent().hasClass('product-single__photo--container')) {
        $(parent).css('position', 'relative').after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-single__photo-wrapper') && $(parent).parent().hasClass('grid__item')) {
        $(parent).css('position', 'relative').after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('feature-row__text') && $(parent).hasClass('feature-row__item')) {
        //Fix Aroma bug on featured product at home page && remove for radio shop
        let parentWrapper = $(parent).parent();
        if (parentWrapper.find('.feature-row__image-wrapper').length && !parentWrapper.find(".supports-js").length) {
            parentWrapper.find('.feature-row__image-wrapper').after(htmlLabel);
        }
        appended = true;

    } else if ($(parent).hasClass('slideshow__slide')) {
        // Fix bugs for deckout-in, label appear on slide
        appended = true;
    } else if ($(parent).hasClass('product__image-container')) {
        // Fix for narrative theme on product page with multiple variants
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-gallery--image-background') && $(parent).parent().hasClass('product-gallery--media') && (BSS_PL.storeId != 28129 && BSS_PL.storeId != 22921)) {
        //Fix bugs for Estylopro at product page gallery slider
        $(parent).parent().after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('zoomGalleryActive') && $(parent).parent().hasClass("slick-slide")) {
        //Fix bugs for Kookint at product page gallery slider
        $(".pt-product-single-img").after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('cbb-also-bought-product') && $(parent).find('a').length && BSS_PL.storeId != 2241) {
        $(".pt-product-single-img").find("a").prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-block') && $(parent).has('grid__item')) {
        //Fix bugs for dutahome
        if ($(parent).find('.product-block__image').length) {
            $(parent).find('.product-block__image').after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('image__container')) {
        $(parent).css("position", "relative");
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-item') && $(parent).find('.product-item__image-wrapper').length) {
        //fix bug for boxxco
        let correctElement = $(parent).find('.product-item__image-wrapper');
        correctElement.css("position", "relative");
        correctElement.after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-item') && $(parent).find('.product-item__thumbnail').length) {
        let correctElement = $(parent).find('.product-item__thumbnail');
        correctElement.css("position", "relative");
        correctElement.after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product__main-photos')) {
        if ($(parent).hasClass('aos-animate')) {
            appended = true;
        } else {
            $(parent).after(htmlLabel);
            appended = true;
        }


    } else if ($(parent).hasClass("product-thumb") && BSS_PL.storeId != 2656) {
        if ($(parent).parent().hasClass("collection-products-wrapper")) {
            $(parent).after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).parent().hasClass('shopify-product-gallery__image')) {
        $(parent).parent().after(htmlLabel);
        appended = true;
    } else if (!$(parent).hasClass('product-collection__image') && !$(parent).hasClass('tt-image-box') && $(parent).parent().parent().hasClass('slick-slide') && BSS_PL.storeId != 28202) {
        $(parent).parent().after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass("productitem") && (BSS_PL.storeId !== 23084 || BSS_PL.storeId !== 28129)) {
        // fix bugs for www.taut-strap.co.uk
        let childItem = $(parent).find(".productitem--image-link");
        if (childItem.length) {
            childItem.css("position", "relative");
            childItem.after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass("o-layout__item")) {
        //Fix bugs for inabox.de
        var childItem = $(parent).find(".product__media");
        if (childItem.length) {
            childItem.css("position", "relative");
            childItem.after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('product-single__photo__item') && $(parent).hasClass('slick-slide')) {
        //Fix bugs for inabox.de on product page
        $(parent).css("position", "relative");
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-galley--image-background')) {
        $(parent).css("position", "relative");
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('grid-product__content') && BSS_PL.storeId != 2788 && BSS_PL.storeId != 9987) {
        $(parent).css("position", "relative");
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('thumbnail') && $(parent).hasClass('columns')) {
        //fix bugs for okperfumes on collection page.
        if ($(parent).find('.product_image').length) {
            $(parent).find('.product_image').after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('fancybox') && $('#shopify-section-product-template .flexslider').length) {
        // $('#shopify-section-product-template .flexslider')
        $(parent).parent().after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('rimage-wrapper') || $(parent).hasClass('rimage-outer-wrapper')) {
        //Fix for slick slider www.mossimo.ph
        if (!$(parent).parent().parent().hasClass('thumbnail--media-image')) {
            $(parent).after(htmlLabel);
        }
        appended = true;
    } else if ($(parent).hasClass('product-media--image') && $(parent).parent().hasClass('main')) {
        // Fix for bestow
        if (($(parent).find(".bss_pb_img").length == 0)
            && ($(parent).find('.rimage-wrapper[data-handle]').length == 0)
        ) {
            $(parent).css("position", "relative");
            $(parent).after(htmlLabel);
            appended = true;
        }

    } else if (!$(parent).hasClass('recomatic-product-wrap') && $(parent).hasClass('swiper-slide') && $(parent).parent().hasClass('swiper-wrapper')) {
        //fix xn-sckf2d4etfc by vitu
        if (BSS_PL.storeId == 10680) {
            if ($(parent).hasClass('kusaba_product-slider__slide swiper-slide swiper-slide-active')) {
                $(parent).parent().after(htmlLabel)
            }
        }
        $(parent).css("position", "relative");
        $(parent).after(htmlLabel);
        appended = true;
    } else if (BSS_PL.storeId != 17149 && $(parent).hasClass('prod-image')) {
        let correctParent = $(parent).parent();
        if ($(correctParent).hasClass('prod-container')) {
            $(correctParent).css("position", "relative");
            $(correctParent).after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('aspect-ratio') && $("#shopify-section-product-template .flickity-viewport").length) {
        var flickViewPort = $("#shopify-section-product-template .flickity-viewport");
        if (!$(flickViewPort).parent().find(".bss_pb_img").length) {
            $(flickViewPort).after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('product-single__meta')) {
        var parentLevel2 = $(parent).parent().parent();
        var imageWrapperElement = parentLevel2.find(".product-single__featured-image-wrapper");
        if (imageWrapperElement.length) {
            $(imageWrapperElement).after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('featured-img')) {
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('c-slide-product__wrap-image') && $(parent).hasClass('slick-slide')) {
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('image-cont') && $(parent).hasClass('with-secondary-image')) {
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('cart-mini-item-image')) {
        appended = true;
    } else if ($(parent).hasClass('product-gallery--media-wrapper')) {
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('snize-product')) {
        //Fix for https://www.eyefoodfactory.pro/, search page
        let correctChild = $(parent).find('.snize-thumbnail');
        if (correctChild.length) {
            $(correctChild).after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('fotorama__stage__frame') || $(parent).parent().hasClass('product-page-gallery__thumbnail')) {
        let correctParent = $('.product-page-gallery__main--single.product-page-gallery__main');
        if (correctParent.length && correctParent.find('.bss_pb_img').length == 0) {
            $(correctParent).css("position", "relative");
            $(correctParent).after(htmlLabel);
        }
        appended = true;
    } else if (![13709].includes(BSS_PL.storeId) && $(parent).hasClass('ProductItem__Wrapper') && !$(parent).next('.bss_pb_img').length) {
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('tt-image-box') && BSS_PL.storeId != 28202) {
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('tt-layout-vertical')) {
        let correctChild = $(parent).find('.tt-img');
        if (correctChild.length) {
            $(correctChild).after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('mediaimageholder') && BSS_PL.storeId != 28202) {
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('zoom-container')) {
        let correctParent = $('#shopify-section-product__main .product-gallery__main .flickity-viewport');
        if (correctParent.length) {
            $(correctParent).after(htmlLabel);
        } else {
            $(parent).after(htmlLabel);
        }
        appended = true;
    } else if ($(parent).hasClass('recomatic-product-wrap')) {
        let correctChild = $(parent).find('.recomatic-image-wrap');
        if (correctChild.length) {
            $(correctChild).after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('product-element-top')
        && ($(parent).parent().parent().hasClass('owl-carousel-item-inner') || $(parent).parent().hasClass('product-grid-item'))) {
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('gf_module-center')) {
        $(parent).find('a').after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('vtl-product-card__header')) {
        $(parent).find('.vtl-product-card__image').after(htmlLabel);
        appended = true;
    } else if ($(parent).parent().hasClass('product-top') && $(parent).hasClass('product-image')) {
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('fancybox') && $(parent).parent().hasClass('thumb')) {
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('proHImage') || $(parent).hasClass('proFeaturedImage')) {
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('vtl-pb-main-widget__product-image')) {
        let correctParent = $(parent).find('a')
        if (correctParent.length) {
            correctParent.after(htmlLabel);
            correctParent.css('text-decoration', 'none')
        }
        var contentHtml = $(parent).find('.bss-pl-frontend')
        if (contentHtml.length) {
            contentHtml.css('position', 'relative')
        }
        appended = true;

    } // fix label for littleunicorn
    else if ($(parent).hasClass('photo-zoom-link ')) {
        let correctParent = $(parent).parent().parent()
        if (correctParent.hasClass('product-image-main')) {
            correctParent.after(htmlLabel)
        }
        appended = true;
    } else if ($(parent).hasClass('image--container') && $(parent).parent().hasClass('image--root')) {
        //Fix for https://www.valleyislekombucha.com/
        let correctParent = $(parent).parent().parent().parent();
        if (correctParent.hasClass('modal--link') && (correctParent.find('.bss_pb_img').length == 0)) {
            correctParent.after(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('mthumb') && $(parent).parent().hasClass('owl-item')) {
        $(parent).after(htmlLabel);
        appended = true;
    } else if ($(parent).is("#bigimage")) {
        $(parent).after(htmlLabel);
        appended = true;
    }
    // fix label for hairclub
    else if ($(parent).hasClass("position-relative")) {
        $(parent).after(htmlLabel);
        appended = true;
    }
    // fix for cwallon
    else if ($(parent).hasClass("image-container-position")) {
        let correctParent = $(parent).parent().parent()
        if (correctParent.hasClass("image-container") && !correctParent.find('.bss_pb_img').length) {
            correctParent.after(htmlLabel);
            appended = true;
        }
    }

    // fix for theme express
    else if ($(parent).hasClass('gallery__image-wrapper') && $(parent).hasClass('gallery__image-wrapper--scale')) {
        $(parent).after(htmlLabel)
        appended = true
    }
    // fix for narrative theme
    else if ($(parent).hasClass('product__submedia-wrapper') || $(parent).hasClass('product__media-wrapper')) {
        $(parent).after(htmlLabel)
        appended = true
    }
    // Fix for minimal theme on product page, product slider
    else if ($(parent).parent().hasClass('product-single__image-wrapper')) {
        let parentLevel2 = $(parent).closest('.product-single__image-wrapper').parent().find('.product-single__image-wrapper').last();
        if (!(parentLevel2).next('.bss_pb_img').length) {
            parentLevel2.css('position', 'relative').after(htmlLabel);
        }
        appended = true;
    }
    // Fix for supply
    else if ($(parent).hasClass('product__image-wrapper') && $(parent).hasClass('no-js')) {
        $(parent).after(htmlLabel);
        appended = true;
    }
    // boundless
    else if ($(parent).hasClass('product__photo--single')) {
        $(parent).after(htmlLabel);
        appended = true;
    }
    // XuTho fix code compatible theme dawn 2.0
    if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1 && Shopify.theme.name !== "Dawn-5.0.0") {
        if ($(parent).hasClass('product__media')) {
            let parent1 = $(parent).closest('.product__modal-opener');
            if (parent1.length && !parent1.parent().find('.bss_pb_img').length) {
                parent1.after(htmlLabel);
                appended = true;
            }
        } else if ($(parent).hasClass('card-information__text')) {
            let parent2 = $(parent).closest('.card-wrapper').find('.card--product');
            if (parent2.length && !parent2.parent().find('.bss_pb_img').length) {
                parent2.after(htmlLabel);
                appended = true;
            }
            let parent3 = $(parent).closest('.collage-content').find('.collage-card__image-wrapper');
            if (parent3.length && !parent3.parent().find('.bss_pb_img').length) {
                parent3.after(htmlLabel);
                appended = true;
            }
        } else if ($(parent).hasClass('product__info-container')) {
            let parent4 = $(parent).closest('.featured-product').find('.product__media-list');
            if ($(parent4).length && $(parent4)[0].length && !$(parent4).parent().find('.bss_pb_img').length) {
                $(parent4).parent().after(htmlLabel);
                appended = true;
            }
        } else if ($(parent).hasClass('card__heading')) {
            let parent5 = $(parent).closest('.card-wrapper').find('.card__inner')
            if (parent5.length && !parent5.parent().find('.bss_pb_img').length) {
                parent5.after(htmlLabel);
                appended = true;
            }
        }
    }
    // fix badge theme Sense, Craft, Refresh by HuyNT, NhatHN
    if (Shopify && Shopify.theme && Shopify.theme.name && (Shopify.theme.name.indexOf("Sense") !== -1 || Shopify.theme.name.indexOf("Craft") !== -1 || Shopify.theme.name.indexOf("Refresh") !== -1)) {
        if ($(parent).hasClass('product__media')) {
            let parent1;
            if(Shopify.theme.name.indexOf("Sense") !== -1){
                parent1 = $(parent).closest('.product__media-item').find('.product-media-container');
            } else{
                parent1 = $(parent).closest('.product__media-item').find('.product__modal-opener');
            }
            if (parent1.length && !$(parent).closest('.product__media-item').find('.bss_pb_img').length) {
                parent1.after(htmlLabel);
                appended = true;
            }
        } else if ($(parent).hasClass('card-information__text')) {
            let parent2 = $(parent).closest('.card-wrapper').find('.card__inner');
            if (parent2.length && !parent2.parent().find('.bss_pb_img').length) {
                parent2.after(htmlLabel);
                appended = true;
            }
        }
        else if ($(parent).hasClass('card__heading')) {
            let parent2 = $(parent).closest('.card-wrapper').find('.card__inner');
            $(parent).closest(".card-wrapper").find(".bss_pb_img").attr('style', 'width: unset !important')
            $(parent).closest(".card-wrapper").find(".bss_pb_img").css("margin", "0 1.6rem")
            if ($(parent2).length && !(parent2).parent().find('.bss_pb_img').length) {
                if ($(parent).closest('.card--standard').length) {
                    parent2.after(htmlLabel);
                    appended = true;
                }
                else if ((parent2).find('.card__media').length) {
                    parent2.after(htmlLabel);
                    appended = true;
                }
            }
        }
    }

    /** FIX SUPPORT BY STORE ID */
    if (typeof bssFixSupportBadgeImage == 'function') {
        // eslint-disable-next-line
        appended = bssFixSupportBadgeImage($, parent, page, htmlLabel, appended)
    }
    /** END FIX SUPPORT BY STORE ID */

    return appended;
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/getConfigRunScript/getInfoVisibilityDate.js
function getInfoVisibilityDate($, BSS_PL, item) {
    var enableVisibilityDate = item.enable_visibility_date;
    var isShowByVisibilityDate = true;
    if (enableVisibilityDate && (BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd')) {
        var currentDate = new Date();
        if (item.from_date && !item.to_date) {
            if (currentDate < new Date(item.from_date)) {
                isShowByVisibilityDate = false;
            }
        } else if (item.to_date && !item.from_date) {
            if (currentDate > new Date(item.to_date)) {
                isShowByVisibilityDate = false;
            }

        } else if (item.from_date && item.to_date) {
            if (currentDate < new Date(item.from_date) || currentDate > new Date(item.to_date)) {
                isShowByVisibilityDate = false;
            }
        } else if (!item.from_date && !item.to_date) {
            isShowByVisibilityDate = true;
        }
    }
    return isShowByVisibilityDate;
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/getConfigRunScript/getInfoShowByDiscountRange.js
function getInfoShowByDiscountRange($, BSS_PL, item, discount, prod) {
    var enableDiscountRange = item.enable_discount_range;
    var isShowByDiscountRange = true;
    var discountFrom = item.discount_from;
    var discountTo = item.discount_to;

    if (enableDiscountRange) {
        if (item.product_type == 4) {
            if (prod.variants.length) {
                prod.variants.forEach(function (variant) {
                    var compareAtPriceMax = variant.compare_at_price;
                    var variantPrice = variant.price;
                    var discountVar = 0;
                    if (compareAtPriceMax > 0) {
                        // fix round to int
                        discountVar = parseFloat((((compareAtPriceMax - variantPrice) / compareAtPriceMax) * 100).toFixed(0));
                        if (isNaN(discountVar)) {
                            discountVar = 0;
                        }
                    } else {
                        discountVar = -1;
                    }
                    if (discountVar == 0 || discountVar < 0) {
                        prod.variants = prod.variants.filter(function (item) {
                            return item.id != variant.id;
                        });
                    } else {
                        const flag = (discountFrom && !discountTo && discountVar < discountFrom) ||
                                     (!discountFrom && discountTo && discountVar > discountTo) ||
                                     (discountFrom && discountTo && (discountVar < discountFrom || discountVar > discountTo))

                        if(flag){
                            prod.variants = prod.variants.filter(function (item) {
                                return item.id != variant.id;
                            });
                        } else if (!discountFrom && !discountTo) {
                            isShowByDiscountRange = true;
                        }
                    }
                });
                if (!prod.variants.length) {
                    isShowByDiscountRange = false;
                }
            } else {
                isShowByDiscountRange = false;
            }
        } else if (item.label_text && (item.label_text.includes("%7Bsale%7D") || item.label_text.includes("%7Bsale_amount%7D"))) {
            if (discount == 0 || discount < 0) {
                return false;
            } else {
                const flag = (discountFrom && !discountTo && discount < discountFrom) ||
                             (!discountFrom && discountTo && discount > discountTo) ||
                             (discountFrom && discountTo && (discount < discountFrom || discount > discountTo))

                if(flag){
                    isShowByDiscountRange = false;
                } else if(!discountFrom && !discountTo){
                    isShowByDiscountRange = true;
                }
            }
        } else {
            let productCompareAtPrice = prod.compare_at_price_max;
            let productPrice = prod.price_min;
            let productDiscount = 0;
            if (productCompareAtPrice > 0) {
                // fix round to int
                productDiscount = parseFloat((((productCompareAtPrice - productPrice) / productCompareAtPrice) * 100).toFixed(0));
                if (isNaN(productDiscount)) {
                    productDiscount = 0;
                }
            } else {
                productDiscount = -1;
            }

            if (productDiscount == 0 || productDiscount < 0) {
                return false;
            } else {
                const flag = (discountFrom && !discountTo && productDiscount < discountFrom) ||
                             (!discountFrom && discountTo && productDiscount > discountTo) ||
                             (discountFrom && discountTo && (productDiscount < discountFrom || productDiscount > discountTo))

                if(flag){
                    isShowByDiscountRange = false;
                } else if (!discountFrom && !discountTo) {
                    isShowByDiscountRange = true;
                }
            }
        }
    }

    return isShowByDiscountRange;
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/getConfigRunScript/getInfoShowByStock.js
function getInfoShowByStock($, BSS_PL, item, isAvailable, totalQuantityInventory, prod, page) {
    var isShowByStock = null;
    var inventoryStatus = item.inventory;
    if (BSS_PL.currentPlan === 'free') {
        isShowByStock = true;
    } else {
        // when tick continue selling when out off stock allway show label, add store_id here to check by inventory
        var storeIdCheckInventory = [9273, 7240, 1381, 13744, 13931, 12376, 14560, 15312, 19267, 18243, 23776, 26145, 36860]
        if (item.product_type == 4) {
            if (prod.variants.length) {
                prod.variants.forEach(function (variant) {
                    var isVarAvailable = variant.available;
                    var quantityInventory = variant.quantity;
                    if ((inventoryStatus == 1 && !isVarAvailable) || (inventoryStatus == 2 && isVarAvailable)) {
                        prod.variants = prod.variants.filter(function (item) {
                            return item.id != variant.id;
                        });
                    }
                    if (inventoryStatus == 3) {
                        if (storeIdCheckInventory.indexOf(BSS_PL.storeId) !== -1) {
                            if (item.instock > quantityInventory) {
                                prod.variants = prod.variants.filter(function (item) {
                                    return item.id != variant.id;
                                });
                            }
                        } else if (BSS_PL.storeId == 12388) {
                            if (item.instock > quantityInventory) {
                                prod.variants = prod.variants.filter(function (item) {
                                    return item.id;
                                });
                            }
                        } else {
                            if (!isVarAvailable) {
                                prod.variants = prod.variants.filter(function (item) {
                                    return item.id != variant.id;
                                });
                            } else {
                                if (item.instock > quantityInventory) {
                                    prod.variants = prod.variants.filter(function (item) {
                                        return item.id != variant.id;
                                    });
                                }
                            }
                        }
                    }
                    if (inventoryStatus == 4) {
                        if (storeIdCheckInventory.indexOf(BSS_PL.storeId) !== -1) {
                            if (item.instock < quantityInventory) {
                                prod.variants = prod.variants.filter(function (item) {
                                    return item.id != variant.id;
                                });
                            }
                        } else {
                            if (!isVarAvailable) {
                                prod.variants = prod.variants.filter(function (item) {
                                    return item.id != variant.id;
                                });
                            } else {
                                if (item.instock < quantityInventory) {
                                    prod.variants = prod.variants.filter(function (item) {
                                        return item.id != variant.id;
                                    });
                                }
                            }
                        }
                    }
                });
                if (!prod.variants.length) {
                    isShowByStock = false;
                } else {
                    isShowByStock = true;
                }
            } else {
                isShowByStock = false;
            }
        } else {
            isShowByStock = (inventoryStatus == 0) || (inventoryStatus == 1 && isAvailable) || (inventoryStatus == 2 && !isAvailable) || (inventoryStatus == 3 && item.instock <= totalQuantityInventory) || (inventoryStatus == 4 && item.instock >= totalQuantityInventory)
            if (BSS_PL.storeId == 20111 || BSS_PL.storeId == 17186 || BSS_PL.storeId == 23885 || BSS_PL.storeId == 13937) {
                isShowByStock = (inventoryStatus == 0) || (inventoryStatus == 1 && isAvailable) || (inventoryStatus == 2 && !isAvailable) || (inventoryStatus == 3 && item.instock <= totalQuantityInventory) || (inventoryStatus == 4 && item.instock >= totalQuantityInventory && totalQuantityInventory > 0)
            }
            if (BSS_PL.storeId === 34684 || BSS_PL.storeId === 36860 ) {
                if (item.label_type === 2 && inventoryStatus == 4 && item.instock >= totalQuantityInventory && totalQuantityInventory <= 0) {
                    isShowByStock = false;
                }
            }
        }
    }
    // XuTho customize gatefurn
    if (BSS_PL.storeId == 7240) {
        if (inventoryStatus == 3) {
            isShowByStock = false;
            if (page == "products") {
                var variantProduct = $('.product-gallery--image-background').attr('bss-variant-id');
                prod.variants.map((items) => {
                    if (items.id == variantProduct && items.quantity > 0) {
                        isShowByStock = true;
                    }
                })
            } else {
                prod.variants.map((items) => {
                    if (items.id && items.quantity > 1) {
                        isShowByStock = true;
                    }
                })
            }
        }
    }
    return isShowByStock;
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/label/unlimitedCssFixBugForStores.js
function unlimitedCssFixBugForStores($, BSS_PL, item, parent) {
    //Define width, height of canvas
    const WIDTHCANVAS = 500;
    const HEIGHTCANVAS = 500;
    let checkPCScreen = $(window).width() > 768;
    let deviceName = checkPCScreen ? 'desktop' : 'mobile';

    let width = item[`${deviceName}_label_unlimited_width`]
    let height = item[`${deviceName}_label_unlimited_height`]
    let top = item[`${deviceName}_label_unlimited_top`]
    let left = item[`${deviceName}_label_unlimited_left`]
    let topPer = top + '%'
    let leftPer = left + '%'

    if (BSS_PL.currentPlan == 'twenty_usd' && item[`${deviceName}_fixed_percent_label`] == 0) {
        if (top > (height / HEIGHTCANVAS * 100)) {
            topPer = `calc(${top + (height / HEIGHTCANVAS * 100)}% - ${height}px)`;
        }
        if ((left == 0 && ![21611].includes(BSS_PL.storeId)) || left > (width / WIDTHCANVAS * 100)) {
            leftPer = `calc(${left + (width / WIDTHCANVAS * 100)}% - ${width}px)`
        }
    }

    let styleForLabelText = `
                             top : ${topPer} !important;
                             left : ${leftPer} !important;
                             margin-top : 0 !important;
                             margin-left : 0 !important;`;

    /** FIX SUPPORT BY STORE ID */
    if (typeof bssFixSupportLabelTextStyle == 'function') {
        // eslint-disable-next-line
        styleForLabelText = bssFixSupportLabelTextStyle($, parent, styleForLabelText, top, left)
    }
    /** END FIX SUPPORT BY STORE ID */

    return styleForLabelText;
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/getConfigRunScript/getElementImage.js
function getElementImage($, BSS_PL, item, parent, page) {
    // eslint-disable-next-line
    var img = $(parent).find('img[srcset*="/products/"][srcset*="/cdn.shopify.com/s/files/"],' + // eslint-disable-line
                    'img[src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"],' + // eslint-disable-line
                    'img[srcset*="/products/"][srcset*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".jp\"],' + // eslint-disable-line
                    'img[srcset*="/products/"][srcset*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".JP\"],' + // eslint-disable-line
                    'img[srcset*="/products/"][srcset*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".png\"],' + // eslint-disable-line
                    'img[srcset*="/products/"][srcset*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".PNG\"],' + // eslint-disable-line
                    'img[data-src*="/products/"][data-src*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".jp\"],' + // eslint-disable-line
                    'img[data-src*="/products/"][data-src*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".JP\"],' + // eslint-disable-line
                    'img[data-src*="/products/"][data-src*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".png\"],' + // eslint-disable-line
                    'img[data-src*="/products/"][data-src*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".PNG\"],' + // eslint-disable-line
                    'img[srcset*="cdn.shopify.com"][src*="no-image"],' + // eslint-disable-line
                    'img[src*="cdn.shopify.com"][src*="no-image"],' + // eslint-disable-line
                    'img[srcset*="cdn.shopify.com"][srcset*="/files/"],' + // eslint-disable-line
                    'img[src*="cdn.shopify.com"][src*="/files/"],' + // eslint-disable-line
                    'img[srcset*="cdn/shop/files/"],' + // eslint-disable-line
                    'img[src*="cdn/shop/files/"],' + // eslint-disable-line
                    'img[src*="cdn/shop/products/"],' + // eslint-disable-line
                    '.swiper-lazy[src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"],.engoj_img_main[src*="/products/"][src*="/cdn.shopify.com/s/files/"],' + // eslint-disable-line
                    '.single_product__img img[src*="/cdn.shopify.com/s/files/"],' +
                    '[data-pf-type="MasterImage"] img[src*="/cdn.shopify.com/s/files/"],' +
                    '.c-slide-product__wrap-image.slick-slide .c-slide-product__image[src*="/cdn.shopify.com/s/files/"],' +
                    '#ProductPhotoImg[src*="/cdn.shopify.com/s/files/"],' +
                    '.zoom-product[data-zoom-image][src*="/cdn.shopify.com/s/files/"],' +
                    '.fotorama__img[src*="/cdn.shopify.com/s/files/"],' +
                    '.product-big-image img[src*="/cdn.shopify.com/s/files/"],' +
                    '#bigimage img.mainimage[src*="/cdn.shopify.com/s/files/"],' +
                    '#mob-product-images .mthumb img[src*="/cdn.shopify.com/s/files/"],' +
                    'img.FeaturedImage-product-template.product-featured-img[src*="/cdn.shopify.com/s/files/"],' +
                    '.position-relative div[data-zoom-images*="/cdn.shopify.com/s/files/"],' +
                    'img.image-zoom[src*=\"/cdn.shopify.com/s/files/\"],' + // eslint-disable-line
                    '.slick-slide.slick-current.slick-active img[src*="/cdn.shopify.com/s/files/"],' +
                    '.detail-content-inner .detail-content .info-detail-pro #product-image img[src*="/cdn.shopify.com/s/files/"],' +
                    '.product-single__photos .slideshow__image[data-bgset*="/cdn.shopify.com/s/files/"],' +
                    '.op_0.dn[src*="data:image/gif;base64"],' +
                    'img.Image--fadeIn.lazyautosizes.Image--lazyLoaded[data-original-src*="/cdn.shopify.com/s/files/"],' +
                    'img.Image--lazyLoad.Image--fadeIn[data-original-src*="/cdn.shopify.com/s/files/"],' +
                    'img[data-zoom-src*="/cdn.shopify.com/s/files/"][src*="/cdn.shopify.com/s/files/"],' +
                    'img.lazyautosizes.lazyloaded[data-srcset*="/cdn.shopify.com/s/files/"],' +
                    '.product-photo-container img#product-featured-image[src*="/cdn.shopify.com/s/files/"],' +
                    'img.zoom-product[src*="/cdn.shopify.com/s/files/"],' + 'img[itemprop*="image"][src*="/cdn.shopify.com/s/files/"],' + 'img.zoomImg[src*="/cdn.shopify.com/s/files/"],' +
                    '.product-image .product-single__media.product-single__media--image[data-bgset*="/cdn.shopify.com/s/files/"],' +
                    '.product-layout-images .product-image--single[data-bgset*="/cdn.shopify.com/s/files/"],' +
                    '.product-swiper-img-height.swiper-slide-active[style*="background-image"],' +
                    '.product-layout-images .product-image[data-bgset*="/cdn.shopify.com/s/files/"],' +
                    '.gt_product-img-box img.gt_product-image--feature[src*="//cdn.shopify.com/s/files/"],' +
                    '.zoomContainer div.zoomWindow[style*="background-image"],' +
                    'img.gf_product-image-thumb[src*="//cdn.shopify.com/s/files/"], ' +
                    '.main-product-image img[src*="//cdn.shopify.com/s/files/"], ' +
                    '.product-image-wrapper img[src*="//cdn.shopify.com/s/files/"], ' +
                    '.product-single__photo-wrapper img.product-single__photo, ' +
                    '.owl-item img.lazyautosizes.lazyloaded[src*="//cdn.shopify.com/s/files/"],' +
                    'img.gt_product-image--feature.gt_lazyload.gt_lazyloaded[src*="//cdn.shopify.com/s/files/"],' +
                    'img.lazyload--mirage.lazyautosizes.lazyloaded[data-srcset*="/cdn.shopify.com/s/files/"][data-sizes="auto"],' +
                    'img.gt_active.gt_lazyload[src*="//cdn.shopify.com/s/files/"],' +
                    'img.rimage__image.fade-in.lazyautosizes[data-srcset*="/cdn.shopify.com/s/files/"],' +
                    '.product-photo-container img[src*="//cdn.shopify.com/s/files/"],' +
                    '.product__image.lazyload.lazyload-fade img[data-src*="/cdn.shopify.com/s/files/"],' +
                    '.product_slider img.featured_image[src*="//cdn.shopify.com/s/files/"],' +
                    '.flickity-viewport .flickity-slider .img_ptw,' +
                    '.product__image[style*="//cdn.shopify.com/s/files/"],' +
                    'div.product-single__photo.js-zoom-enabled, ' +
                    'div.swiper-slide img.product-featured-media[srcset*="//cdn.shopify.com/s/files/"],' +
                    'img.rondell-item-image.rondell-item-resizeable[src*="//cdn.shopify.com/s/files/"],' +
                    '.paira-single-product-image img.fotorama__img,' +
                    '.flickity-viewport img[src*="//cdn.shopify.com/s/files/"],' +
                    '.image-wrap img.photoswipe__image[srcset*="//cdn.shopify.com/s/files/"],' +
                    // fix for missamara by ThaBi
                    'img.bss-custom-img-product-page[src*="//cdn.shopify.com/s/files/"],' +
                    // fix for avenue85 by XuTho
                    'img.rimage__image.fade-in.lazyautosizes[data-srcset*="//cdn.shopify.com/s/files/"],' +
                    '.owl-wrapper-outer .image--container img.lazyautosizes.lazyloaded[data-srcset*="//cdn.shopify.com/s/files/"],' +
                    '.product-gallery__main_item .rimage img.rimage__img.donothide.entered.loaded.ls-is-cached.lazyloaded[data-master*="//cdn.shopify.com/s/files/"],' +
                    'img.rimage__img[data-master*="//cdn.shopify.com/s/files/"],' +
                    'img[src*="//cdn.accentuate.io"]:not(.kusaba_product-slider-thumbnail__img),' +
                    '.image__container img.lazyload--fade-in[data-src*="/cdn.shopify.com/s/files/"],' +
                    'button.product__media-toggle,' +
                    'img.lazyautosizes.lazyloaded,' +
                    'img.photoswipe__image.lazyload,' +
                    '.product__thumb-item div.image-wrap img,' +
                    //fix bug for samsaraluggage by tungnk
                    '.media-gallery__main .product-media--image,' +
                    //fix for alterreny by tungnk
                    '#bigimage .mainimage,' +
                    '.collection-grid-item__overlay,' +
                    //fix for meermin by tungnk
                    '.product-gallery .product-gallery__featured-carousel .product-gallery__featured-image,' +
                    '.pg__mains .pg__main img,' +
                    '.product-gallery__media.snap-center.is-initial img').not('.bss-pl-frontend').first();

    if (!img.length) {
        img = $(parent).find('.grid-view-item__image-wrapper')
        // fix case lazyload image
        var lazyLoadStoreIds = [26404, 3493, 28950, 17552, 32372, 31918, 21218, 10170, 11088, 7901, 10795, 9266, 11819, 11103, 4527, 11906, 7637, 8947, 13260, 16183, 18978, 757, 23458, 12484, 27553, 13265, 28236, 28005, 6017, 12388, 27903, 17149, 31067, 7915, 30844, 22672, 32043, 32855]
        if (lazyLoadStoreIds.indexOf(BSS_PL.storeId) !== -1 && page != 'products') {
            img = $(parent)
        }
        
        /** FIX SUPPORT BY STORE ID */
        if (typeof bssFixSupportElementImageLazyLoad == 'function') {
            // eslint-disable-next-line
            img = bssFixSupportElementImageLazyLoad($, img, parent, page)
        }
        /** END FIX SUPPORT BY STORE ID */
        // end fix case lazyload image
    }
    // fix bug for DAWN 9.0.0 by TruongCN
    if ($(parent).hasClass('product__info-container') && $(parent).closest('.featured-product').length) {
        img = $(parent).closest('.featured-product').find('.product__media-list .product__media-item')
    }
    // XuTho fix code compatible theme dawn 2.0
    if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1) {
        if ($(parent).hasClass('card__heading')) {
            img = $(parent).closest('.card__inner');
        }
    }
    
    /** FIX SUPPORT BY STORE ID */
    if (typeof bssFixSupportElementImage == 'function') {
        // eslint-disable-next-line
        img = bssFixSupportElementImage($, img, parent, page)
    }
    /** END FIX SUPPORT BY STORE ID */

    return img
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/getConfigRunScript/getConfigMarginTopLabel.js


function getConfigMarginTopLabel($, BSS_PL, item, parent, page) {
    let checkPCScreen = $(window).width() > 768
    var img = getElementImage($, BSS_PL, item, parent, page);
    if (($(img).css('max-height') && $(img).css('max-height').indexOf('%') != -1 || $(img).css('max-height') == 'none') && (img.height() == 0 || ($(img).css('height') && $(img).css('height').indexOf('%') != -1))) {
        if ($(img).closest('.photos__item, .supports-js').length){
            img = $(img).closest('.photos__item, .supports-js');
        }
    }

    var margin = 0;
    var heightImg = img.height() > 0 ? img.height() : parseFloat($(img).css('max-height'));
    if (BSS_PL.storeId == 15833) {
        heightImg = heightImg - parseFloat(heightImg / 5)
    }
    let heightItem = checkPCScreen ? item.desktop_height_label : item.mobile_height_label ;
    let marginTop = checkPCScreen ? item.margin_top : item.mobile_margin_top
    if (checkPCScreen ? item.desktop_fixed_percent_label == 0 : item.mobile_fixed_percent_label == 0) {
        if (heightItem + (heightImg * (marginTop / 100)) >= heightImg) {
            margin = heightImg - heightItem;
        } else {
            margin = heightImg * (marginTop / 100)
        }
    } else {
        if (marginTop + heightItem > 100) {
            if (marginTop < heightItem) {
                margin = heightImg * ((100 - heightItem) / 100)
            } else {
                margin = heightImg * (marginTop / 100) - ((heightItem / 100) * heightImg)
            }
        } else {
            margin = heightImg * (marginTop / 100)
        }
    }
    return Math.max(margin, 0)
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/getConfigRunScript/getConfigMarginLeftLabel.js


function getConfigMarginLeftLabel($, BSS_PL, item, parent, page) {
    let checkPCScreen = $(window).width() > 768
    var img = getElementImage($, BSS_PL, item, parent, page);
    if (($(img).css('max-width') && $(img).css('max-width').indexOf('%') != -1 || $(img).css('max-width') == 'none') && (img.width() == 0 || ($(img).css('width') && $(img).css('width').indexOf('%') != -1))) {
        img = $(img).closest('.photos__item, .supports-js');
    }
    var margin = 0;
    var widthImg = img.width() > 0 ? img.width() : parseFloat($(img).css('max-width'))
    let widthItem = checkPCScreen ? item.desktop_width_label : item.mobile_width_label ;
    let marginLeft = checkPCScreen ? item.margin_left : item.mobile_margin_left
    if (checkPCScreen ? item.desktop_fixed_percent_label == 0 : item.mobile_fixed_percent_label == 0) {
        if (widthItem + (widthImg * (marginLeft  / 100)) > widthImg) {
            margin = widthImg - widthItem;
        } else {
            margin = widthImg * (marginLeft  / 100)
        }
    } else {
        if (marginLeft  + widthItem > 100) {
            if (marginLeft  < widthItem) {
                margin = widthImg * ((100 - widthItem) / 100)
            } else {
                margin = widthImg * (marginLeft  / 100) - ((widthItem / 100) * widthImg)
            }
        } else {
            margin = widthImg * (marginLeft  / 100)
        }
    }
    return Math.max(margin, 0)
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/getConfigRunScript/fixFirstImageLabel.js
function fixFirstImageLabel($, BSS_PL, parent, isActive, index, page, labeledParent) {
    function themeFixFirstImageLabel(className, labeledParent, index, isActive) {
        if (labeledParent.get(index) !== undefined && labeledParent.get(index) != null && labeledParent.get(index).includes(className)) {
            isActive = false
        } else {
            labeledParent.set(index, [className])
        }
        return isActive
    }

    const carftThemeClass = [
        'product__modal-opener', 'product-single__photos', 'product__media-container',
        'gallery__image-wrapper', 'product-single__image-wrapper', 'product__photo--single', 'product-single__photo'
    ]
    const narrativeThemeClass = ['product__image-wrapper', 'product-gallery--media-wrapper', 'product-gallery--image-background']
    const beaePageBuilder = ['beae-product-single__media--image']
    const otherClass = ['image-wrap']

    for (let className in [...carftThemeClass, ...narrativeThemeClass, ...beaePageBuilder, ...otherClass]) {
        if ($(parent).hasClass(className)) {
            isActive = themeFixFirstImageLabel(className, labeledParent, index, isActive)
            break
        }
    }

    /** SPECIFIC CASE */
    // Fixed product slide for Debut, simple,narrative,express, minimal, supply, boundless, venture
    if ($(parent).hasClass('product-single__media') && BSS_PL.storeId != 33588) {
        if (BSS_PL.storeId == 33588 || BSS_PL.storeId != 33588 && labeledParent && ($(parent).parent().hasClass('product-single__media-wrapper') || BSS_PL.storeId == 21078 || BSS_PL.storeId == 27405)) {
            isActive = themeFixFirstImageLabel('product-single__media', labeledParent, index, isActive)
        }
    }
    // venture
    if ($(parent).hasClass('product__photo-wrapper') && $(parent).hasClass('product__photo-wrapper-product-template')) {
        isActive = themeFixFirstImageLabel('product__photo-wrapper', labeledParent, index, isActive)
    }
    // narrative
    else if ($(parent).hasClass('product__submedia-wrapper') || $(parent).hasClass('product__media-wrapper')) {
        isActive = themeFixFirstImageLabel('product__submedia-wrapper', labeledParent, index, isActive)
    }
    // XuTho fix code compatible theme dawn 2.0
    else if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1 && $(parent).hasClass('product__media')) {
        if (labeledParent.get(index) !== undefined && labeledParent.get(index) != null && labeledParent.get(index).includes('product__media')) {
            isActive = false
        } else {
            labeledParent.set(index, ['product__media'])
        }
    }
    /** END SPECIFIC CASE */

    /** FIX SUPPORT BY STORE ID */
    if (typeof bssFixSupportFirstImageLabel == 'function') {
        // eslint-disable-next-line
        isActive = bssFixSupportFirstImageLabel($, page, parent, labeledParent, index, isActive)
    }
    /** END FIX SUPPORT BY STORE ID */
    
    return isActive
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/getConfigRunScript/getAllowCustomer.js
function getAllowCustomer($, BSS_PL, item) {
    var status = true;

    if (item.customer_type == 'allcustomers') {
        status = true;
    } else if (item.customer_type == "customer_tags") {
        status = false;
        let allTags = BSS_PL.customerTags.split(',')
        for (let i = 0; i < allTags.length; i++) {
            //fix by hoaduong
            if (item.customer_tags !== null && item.customer_tags !== undefined) {
                if (allTags[i] !== '' && item.customer_tags.includes(allTags[i])) {
                    status = true;
                    break;
                }
            }
        }
    } else if (item.customer_type == "login_customer") {
        if (BSS_PL.customerTags == 'null') {
            status = false
        } else {
            status = true;
        }
    } else if (item.customer_type == "not_login_customer") {
        if (BSS_PL.customerId == 'null') {
            status = true
        } else {
            status = false;
        }
    } else if (item.customer_type == "specific_customers") {
        if (BSS_PL.customerId == 'null') {
            status = false
        } else {
            if (item.customer_ids.indexOf(BSS_PL.customerId) == -1) {
                status = false
            }
        }
    } else {
        status = true;
    }
    
    if (item.exclude_customers == "exclude_customer_tags") {
        let allTags = BSS_PL.customerTags.split(',')
        for (let i = 0; i < allTags.length; i++) {
            if (item.exclude_customer_tags !== null && item.exclude_customer_tags !== undefined) {
                if (allTags[i] !== '' && item.exclude_customer_tags.includes(allTags[i])) {
                    status = false;
                    break;
                }
            }
        }
    } else if (item.exclude_customers == "exclude_specific_customers") {
        if (BSS_PL.customerId != 'null') {
            if (item.exclude_customer_ids.indexOf(BSS_PL.customerId) != -1) {
                status = false
            }
        }
    }
    return status;
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/getConfigRunScript/getVisibilityFixedTimeInfo.js
function getVisibilityFixedTimeInfo($, BSS_PL, item) {
    const enableVisibilityFixedTime = item.enable_fixed_time;
    const fixedTime = JSON.parse(item.fixed_time)
    let isShowByFixedTime = true;

    if (enableVisibilityFixedTime && (BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd')) {
        let date = new Date();
        let currentDay = date.getDay()

        if (fixedTime[currentDay].selected) {
            if (!fixedTime[currentDay].allDay) {
                let currentTime = +(date.getHours().toString() + ((date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()).toString())
                let timeStart = +fixedTime[currentDay].timeStart.replace(':', '')
                let timeEnd = +fixedTime[currentDay].timeEnd.replace(':', '')

                if (currentTime < timeStart || currentTime > timeEnd) isShowByFixedTime = false
            }
        } else isShowByFixedTime = false
    }
    return isShowByFixedTime;
}
// EXTERNAL MODULE: ./src/public/static/base/js/src/init/integrationWithOtherApps.js
var integrationWithOtherApps = __webpack_require__(0);

// CONCATENATED MODULE: ./src/public/static/base/js/src/getConfigRunScript/getBadgeStockRule.js
const INVENTORY_STATUS = {
    ERROR: -1,
    NEGATIVE: 0,
    NOT_TRACKED: 1,
    OUT_OF_STOCK: 2,
    LOW_STOCK: 3,
    MEDIUM_STOCK: 4,
    HIGH_STOCK: 5,
    FULL_STOCK: 6
}

const BADGE_STOCK_TYPE = {
    TEXT_ONLY: 0,
    INSIDE: 1,
    ABOVE: 2
}

const COLORS = {
    GRAY: "#E5E3E3",
    RED: "#FC7B66",
    YELLOW: "#F6C243",
    LIGHT_GREEN: "#B7CD5F",
    GREEN: "#5FCD8D"
}

const MAXIMUM_PROGRESS = {
    [INVENTORY_STATUS.NEGATIVE]: 0,
    [INVENTORY_STATUS.NOT_TRACKED]: 0,
    [INVENTORY_STATUS.OUT_OF_STOCK]: 0,
    [INVENTORY_STATUS.LOW_STOCK]: 10,
    [INVENTORY_STATUS.MEDIUM_STOCK]: 30,
    [INVENTORY_STATUS.HIGH_STOCK]: 70,
    [INVENTORY_STATUS.FULL_STOCK]: 100,
}

function getProgress(progress, index) {
    if (progress > MAXIMUM_PROGRESS[index]) {
        return MAXIMUM_PROGRESS[index]
    }

    return progress;
}

function getColor (index) {
    switch (index) {
        case INVENTORY_STATUS.OUT_OF_STOCK:
        case INVENTORY_STATUS.LOW_STOCK: 
            return COLORS.RED;
        case INVENTORY_STATUS.MEDIUM_STOCK: 
            return COLORS.YELLOW;
        case INVENTORY_STATUS.HIGH_STOCK: 
            return COLORS.LIGHT_GREEN;
        case INVENTORY_STATUS.FULL_STOCK: 
            return COLORS.GREEN;
        default: 
            return COLORS.GRAY;
    }
}

function getBadgeStockRule(configs, totalQuantityInventory) {
    const maxQty = configs[configs.length - 1].qty;
    const configRuleType = getInventoryStatusIndex(configs, totalQuantityInventory);

    if (configRuleType === INVENTORY_STATUS.ERROR) return;

    return {
        type: configRuleType, 
        ...configs[configRuleType],
        ...configRuleType >= INVENTORY_STATUS.LOW_STOCK && {progress: getProgress((totalQuantityInventory * 100) / maxQty, configRuleType)},
    }
}



function getInventoryStatusIndex(configs, totalQuantityInventory) {
    if (configs.length < 7) return INVENTORY_STATUS.ERROR;

    switch (true) {
        case totalQuantityInventory < 0 && configs[INVENTORY_STATUS.NEGATIVE].enable:
            return INVENTORY_STATUS.NEGATIVE;
        case totalQuantityInventory === undefined && configs[INVENTORY_STATUS.NOT_TRACKED].enable:
            return INVENTORY_STATUS.NOT_TRACKED;
        case totalQuantityInventory === 0 && configs[INVENTORY_STATUS.OUT_OF_STOCK].enable:
            return INVENTORY_STATUS.OUT_OF_STOCK;
        case totalQuantityInventory <= 0:
            return INVENTORY_STATUS.ERROR;
        case totalQuantityInventory <= configs[INVENTORY_STATUS.LOW_STOCK].qty && configs[INVENTORY_STATUS.LOW_STOCK].enable:
            return INVENTORY_STATUS.LOW_STOCK;
        case totalQuantityInventory < configs[INVENTORY_STATUS.MEDIUM_STOCK].qty && configs[INVENTORY_STATUS.MEDIUM_STOCK].enable:
            return INVENTORY_STATUS.MEDIUM_STOCK;
        case totalQuantityInventory >= configs[INVENTORY_STATUS.FULL_STOCK].qty && configs[INVENTORY_STATUS.FULL_STOCK].enable:
            return INVENTORY_STATUS.FULL_STOCK;
        case totalQuantityInventory >= configs[INVENTORY_STATUS.HIGH_STOCK].qty && configs[INVENTORY_STATUS.HIGH_STOCK].enable:
            return INVENTORY_STATUS.HIGH_STOCK;
        default:
            return INVENTORY_STATUS.ERROR;
    }
}

function canShowBadgeStock(configs, totalQuantityInventory) {
    const configRuleIndex = getInventoryStatusIndex(configs, totalQuantityInventory)
    return configRuleIndex !== INVENTORY_STATUS.ERROR;
}

function getBadgeStockHtml(props) {
    const {configs, totalQuantityInventory, className, styleForLabelText, badgeStockStyle} = props;
    const {labelTextId, altText, fontSize, fontFamily, fontStyle, fontColor, fontWeight} = props;
    const {checkStatusLink, textHoverValue, linkTextHoverValue, targetValue} = props;

    const badgeStockConfigs = getBadgeStockRule(configs, totalQuantityInventory);
    if (!badgeStockConfigs) return;
    
    const {progress, content, type} = badgeStockConfigs;

    const textContent = type >= INVENTORY_STATUS.LOW_STOCK  ? unescape(content).replace("#", totalQuantityInventory) : unescape(content);
    /*eslint-disable */
    return `
        <div
            alt="${altText}"
            bss-config-id="${labelTextId}"
            data-bss-pl-text-id="bss-pl-text-${labelTextId}"
            class="
                ${className}
                bss-pb-stock ${badgeStockStyle === BADGE_STOCK_TYPE.ABOVE ? "bss-pb-stock-above" : ""} ${badgeStockStyle === BADGE_STOCK_TYPE.INSIDE ? "bss-pb-stock-inside" : ""} 
                bss_pl_text_hover_text ${checkStatusLink ? 'bss_pl_text_hover_link_enable' : 'bss_pl_text_hover_link_disable'}
            "
            style="${styleForLabelText}; border-color: ${getColor(type)}"
            data-tooltip="${textHoverValue}"
            onclick="window.open('${linkTextHoverValue}', '${targetValue}')"
        >
            <div 
                class="bss-pb-stock-message"
                style="font-size: ${fontSize}px; font-family: ${fontFamily}; color: ${fontColor}; font-style: ${fontStyle}; font-weight: ${fontWeight}"
            >
                ${textContent}
            </div>
            ${badgeStockStyle === BADGE_STOCK_TYPE.INSIDE ? `<div class="bss-pb-stock-progress" style="background-color: ${getColor(type)}; width: ${progress}%"></div>`: ''}
            ${badgeStockStyle === BADGE_STOCK_TYPE.ABOVE ? `<div class="bss-pb-stock-progress"><div style="background-color: ${getColor(type)}; width: ${progress}%"></div></div>` : ''}
        </div>`
    /*eslint-enable */
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/utils/getImageList.js

/* harmony default export */ var getImageList = ({
    getProductVariantId($, parent) {
        let variantId;
        if ($(parent).closest('form[action="/cart"]').length && !$(parent).closest('#CartDrawer').length) {
            const variantTag = traverseParentToFindElementBySelector($, parent, '[href*="?variant="]')
            if (!variantTag) return null;
            const variantPatternReg = /variant=\w+[^&]/;
            const variantPattern = variantPatternReg.exec($(variantTag).attr('href'));
            if (!variantPattern) return null;
            variantId = variantPattern[0].split("=")[1];
        } else if ($(parent).closest('[class*="featured-product"]').length) {
            const featuredProductTag = $(parent).closest('[class*="featured-product"]')
            const featuredProductTagForm = $(featuredProductTag).find('form[action="/cart/add"]');
            if (!featuredProductTagForm.length) return null;
            const variantInput = $(featuredProductTagForm).find('input.product-variant-id[name="id"][value]')
            if (!variantInput.length) return null;
            variantId = $(variantInput).attr('value')
        } else if ($(parent).closest('.product').length) {
            const variantScript = document.querySelector('#bss-variant-id-first-load');
            const variantQuery = /variant=\w+[^&]/.exec(window.location.search);
            if (variantScript) variantId = variantScript.innerText;
            if (variantQuery) variantId = variantQuery[0].split("=")[1]
        }
        return variantId
    },
    handleInventoryText($, product, productVariant, label, parent) {
        if (
            $(parent).closest('form[action="/cart"]').length ||
            $(parent).closest('.product').length ||
            $(parent).closest('[class*="featured-product"]').length
        ) {
            if (
                (productVariant.inventory_management && productVariant.available) ||
                !productVariant.inventory_management ||
                (productVariant.inventory_management && productVariant.inventory_policy === 'continue')
            )
                return label.label_text_in_stock
                
            if (productVariant.inventory_management && !productVariant.available) return label.label_text_out_stock

            return productVariant.available ? label.label_text_in_stock : label.label_text_out_stock
        }
        const highestQuantityVariant = product.variants.reduce((max, variant) => variant.quantity > max.quantity ? variant : max)
        return highestQuantityVariant.available ? label.label_text_in_stock : label.label_text_out_stock
    },
});
// CONCATENATED MODULE: ./src/public/static/base/js/src/utils/index.js



// CONCATENATED MODULE: ./src/public/static/base/js/src/getConfigRunScript/getImageList.js













function getImageList_getImageList($, BSS_PL, data, productItem, res, parent, labeledParent) {
    let checkPCScreen = $(window).width() > 768;
    let checkBrowserIsFirefox = window.navigator.userAgent.indexOf("Firefox");
    let deviceName = checkPCScreen ? 'desktop' : 'mobile';
    let prod = JSON.parse(JSON.stringify(productItem));
    let formatMoney = '';
    //get format money from theme
    var themeFormatMoney = prod.format_money;
    if (BSS_PL.storeId == 11362) {
        formatMoney = '';
    } else if (themeFormatMoney != null && themeFormatMoney != undefined) {
        if (themeFormatMoney[0] != '{') {
            let i = 0;
            while (themeFormatMoney[i] != '{') {
                formatMoney += themeFormatMoney[i];
                i++;
            }
        } else {
            let i = themeFormatMoney.length - 1;
            while (themeFormatMoney[i] != '}') {
                formatMoney += themeFormatMoney[i];
                i--;
            }
            formatMoney = formatMoney.split("").reverse().join("");
        }
    }
    if (BSS_PL.storeId == 18121) {
        formatMoney = formatMoney.toUpperCase()
    }
    var path = window.location.pathname.split('/');
    var page = path[path.length - 2];
    var searchResultPage = '';
    if (page == 'pages') {
        searchResultPage = path[path.length - 1];
    }
    var isProductPage = page == "products";

    var isHomePage = (path[0] == "" && path[1] == "")
    var isCollectionPage = page == "collections" || (path.indexOf("collections") !== -1 && !isProductPage && !isHomePage);
    var isSearchPage = page == 'search' || searchResultPage == 'search-results' || searchResultPage == 'search-results-page' || (path.indexOf("search") !== -1 && !isProductPage && !isCollectionPage && !isHomePage);
    var isCartPage = (path[0] == "" && path[1] == "cart");
    var isOtherPages = !isCollectionPage && !isProductPage && !isSearchPage && !isHomePage && !isCartPage;

    var htmlList = [];
    var checkPriority = [];
    var checkBadge = [];
    var htmlLabelText = [];
    var itemsValid = [];
    var filterPriority = [];
    var configLabelText = [];
    var isAvailable = prod.available;

    // fix for siegmund-welding-tables-usa (tracking qty out of stock product ) - (madu), ninabreddal, dogtas.co.il  by hoaduong
    var outOfStockQuantity = [5673, 12882, 15561]
    if (outOfStockQuantity.indexOf(BSS_PL.storeId) !== -1) {
        isAvailable = isAvailable && prod.inventory > 0;
    }
    var productPrice = prod.price;
    var minPrice = prod.price_min / 100;
    var maxPrice = prod.price_max / 100;
    var discountAmount = 0;
    var discount = 0;
    var listDiscount = [];
    var listDiscountAmount = [];
    var variantCompareAtPrice = [];
    var variantPrice = [];
    var getIdVariant = document.querySelectorAll("product-form.product-form .product-variant-id");
    var freeTheme = ["Dawn", "Sense", "Craft", "Crave", "Ride", "Colorblock", "Taste", "Refresh", "Studio", "Publisher", "Origin", "Spotlight"];
    getIdVariant = Array.from(getIdVariant);
    // fix change {Sale} & {Sale_Amount} by HatDauXanh
    const SaleAndSaleAmount = (prod) => {
        prod.variants.map((item, i) => {
            variantCompareAtPrice.push(item.compare_at_price);
            variantPrice.push(item.price);
            if (variantCompareAtPrice[i] > 0) {
                // fix round to int
                discount = parseFloat((((variantCompareAtPrice[i] - variantPrice[i]) / variantCompareAtPrice[i]) * 100).toFixed(0));
                listDiscount.push(discount)
                discount = Math.max(...listDiscount)
                discountAmount = parseFloat(-(item.compare_at_price - item.price).toFixed(0));
                listDiscountAmount.push(discountAmount);
                discountAmount = Math.min(...listDiscountAmount)
                if (isNaN(discount)) {
                    discount = 0;
                }
            } else {
                //    if compare price blank, then not show {sale} variable -> set to negative number (madu fix)
                discount = -1;
            }
        })
    }

    if (getIdVariant.length && BSS_PL.storeId != 34926) {
        let idProd;
        if (prod.variants.length > 1) {
            prod.variants.map(variant => {
                getIdVariant.map(itemVariant => {
                    if (variant.compare_at_price > 0 && variant.id == itemVariant.value && $(parent).closest(".product").length) {
                        idProd = prod.id;
                        discount = parseFloat((((variant.compare_at_price - variant.price) / variant.compare_at_price) * 100).toFixed(0));
                        discountAmount = parseFloat(-(variant.compare_at_price - variant.price).toFixed(0));
                    } else if (idProd !== prod.id) {
                        SaleAndSaleAmount(prod);
                    }
                })
            })
        } else {
            SaleAndSaleAmount(prod);
        }
    } else {
        SaleAndSaleAmount(prod);
    }
    //fix custome for apaches by HatDauXanh
    if (BSS_PL.storeId == 34926) {
        let dataB2b = []
        if (!window.location.pathname.includes('/cart')) {
            // eslint-disable-next-line
            dataB2b = BSS_B2B.cp.productAfterUseCP
            const result = dataB2b.filter(i => i.id == prod.id)
            if (result.length) {
                discount = result[0].discount_value
            }
        } else {
            // eslint-disable-next-line
            dataB2b = BSS_B2B.cart.cpPricingList
            dataB2b = Array.from(dataB2b.values());
            const result = dataB2b.filter(i => i.id == prod.id)
            if (result.length) {
                discount = result[0].discountValue
            }
        }
    }

    // js create tooltip element
    function createToolTip(hoverValue) {
        let toolTipElement;
        if (hoverValue) {
            document.onmouseover = function (event) {
                let target = event.target;
                let toolTipHtml = target.dataset.tooltip; // eslint-disable-line
                if (!toolTipHtml) return;
                toolTipElement = document.createElement('div');
                toolTipElement.className = 'bss_pl_tooltip';
                toolTipElement.innerHTML = toolTipHtml;
                document.body.append(toolTipElement);
                let labelPosition = target.getBoundingClientRect();
                let left = labelPosition.left + (target.offsetWidth - toolTipElement.offsetWidth) / 2;
                if (left < 0) left = 0;
                let top = labelPosition.top - toolTipElement.offsetHeight - 5;
                if (top < 0) {
                    top = labelPosition.top + target.offsetHeight + 5;
                }
                toolTipElement.style.left = left + 'px';
                toolTipElement.style.top = top + 'px';
            };
            document.onmouseout = function () {
                if (toolTipElement) {
                    toolTipElement.remove();
                    toolTipElement = null;
                }
            };
            document.onscroll = function () {
                if (toolTipElement) {
                    toolTipElement.remove();
                    toolTipElement = null;
                }
            };
        }
    }

    $.each(data, function (index, item) {
        prod = JSON.parse(JSON.stringify(productItem));
        if (index !== 0 && htmlList[0] && htmlList[0].includes("multiple-badge")) return;
        if (index !== 0 && item.enable_multi_badge && htmlList[0]) return;
        var variantPChoice = null;
        var animationClassName = ' '
        switch (item.animation_type) {
            case 1:
                animationClassName = ' bss-animated bss-animate-pulse ';
                break;
            case 2:
                animationClassName = ' bss-animated bss-animate-bounceIn ';
                break;
            case 3:
                animationClassName = ' bss-animated bss-animate-bounceOut ';
                break;
            case 4:
                animationClassName = ' bss-animated bss-animate-swing ';
                break;
            case 5:
                animationClassName = ' bss-animated bss-animate-hiThere ';
                break;
            case 6:
                animationClassName = ' bss-animated bss-animate-flash ';
                break;
            case 7:
                animationClassName = ' bss-animated bss-animate-rollIn ';
                break;
            case 8:
                animationClassName = ' bss-animated bss-animate-rollOut ';
                break;
        }
        // check if item has custom selector then return
        // if(item.custom_selector.length) {
        //     continue;
        // }
        //not support 3 theme in free
        var defaultRelatedProduct = ['grid-view-item', 'supports-js', 'grid-product__image-wrapper', 'grid-product__wrapper', 'grid__item small--one-half', 'product-item__link-wrapper']
        //fix for pamelacoromoto, marvinruby by XuTho thanks ThaBi
        if (BSS_PL.storeId == 4062 || BSS_PL.storeId == 5061) {
            defaultRelatedProduct = ['grid-view-item', 'supports-js', 'grid__item small--one-half', 'product-item__link-wrapper']
        }
        var customRelatedProduct = (item.related_product_tag !== null && item.related_product_tag !== '' && item.related_product_tag != undefined) ? item.related_product_tag.split(',') : []
        if (customRelatedProduct.length) {
            defaultRelatedProduct = customRelatedProduct
        }
        // var isRelatedProduct = false;
        for (let i = 0; i < defaultRelatedProduct.length; i++) {
            var trimItem = defaultRelatedProduct[i].trim();
            if ($(parent).hasClass(trimItem)) {
                // isRelatedProduct = true;
                break;
            }
        }

        var isAllowByCustomer = getAllowCustomer($, BSS_PL, item);
        var isShowByVisibilityDate = getInfoVisibilityDate($, BSS_PL, item)
        var isShowByDiscountRange = getInfoShowByDiscountRange($, BSS_PL, item, discount, prod);
        var isShowByFixedTime = getVisibilityFixedTimeInfo($, BSS_PL, item)

        let totalQuantityInventory = 0;
        for (let i = 0; i < prod.inventory_quantity.length; i++) {
            totalQuantityInventory += prod.inventory_quantity[i]
        }

        // calculate the inventory quantity
        let inventoryQuantity = 0;
        let prodVariantSelected = prod.variants[0]; // default variant
        if ($(parent).closest('form[action="/cart"]').length || $(parent).closest('.product').length || $(parent).closest('[class*="featured-product"]').length) {
            const productId = getImageList.getProductVariantId($, parent)
            const existProdVariant = prod.variants.find(item => item.id.toString() === productId)
            if (existProdVariant) prodVariantSelected = existProdVariant
        }
        else {
            prodVariantSelected = prod.variants.reduce((max, variant) => variant.quantity > max.quantity ? variant : max)
        }
        if (!prodVariantSelected.inventory_management || (prodVariantSelected.inventory_management && prodVariantSelected.inventory_policy === 'continue')) inventoryQuantity = null
        else inventoryQuantity = prodVariantSelected.quantity

        var isShowByStock = getInfoShowByStock($, BSS_PL, item, isAvailable, totalQuantityInventory, prod, page);
        var isAllowCountry = BSS_PL.isAllowCountry(item);
        let checkVisibilityPeriod = BSS_PL.checkVisibilityPeriod(item, prod);

        const isBadgeStock = item.label_type == 2 && item.label_text_enable && item.enable_badge_stock;
        if (isBadgeStock) {
            const isNotTrackedQuantity = () => {
                if (!prod.available) return false;

                if (!prod.variants.length) return false;

                for (const variant of prod.variants) {
                    if (variant.inventory_management) return false;
                }

                return true;
            }
            if (isNotTrackedQuantity()) totalQuantityInventory = undefined;
        }
        const isAllowShowBadgeStock = isBadgeStock && canShowBadgeStock(item.badge_stock_config, totalQuantityInventory);

        if (BSS_PL.currentPlan == 'free' || BSS_PL.currentPlan == 'five_usd') {
            isAllowByCustomer = true;
        }

        if (isAllowCountry
            && isShowByStock
            && isShowByVisibilityDate
            && isShowByDiscountRange
            && isAllowByCustomer
            && checkVisibilityPeriod
            && isShowByFixedTime
            && (!isBadgeStock || isAllowShowBadgeStock)) {
            if (item.pages) {
                var activePages = item.pages.split(",");
                var isActive = (activePages.indexOf("1") >= 0 && isProductPage)
                    || (activePages.indexOf("2") >= 0 && isCollectionPage)
                    || (activePages.indexOf("7") >= 0 && isHomePage)
                    || (activePages.indexOf("3") >= 0 && isOtherPages)
                    || (activePages.indexOf("4") >= 0 && isSearchPage)
                    || (activePages.indexOf("5") >= 0 && isCartPage);
                if (activePages.indexOf("6") > -1 && item.related_product_tag != null && item.related_product_tag !== '' && item.related_product_tag != undefined && parent && parent != null && item.related_product_tag.indexOf(parent.className) > -1) {
                    isActive = false;
                }

                //fix https://tae.in/ by thong chu
                if (BSS_PL.storeId == 13399 && window.location.pathname == "/pages/catalog-search-results") {
                    isActive = false;
                }
                // done with debut, brooklyn, simple, minimal, supply, express, narrative
                // boundless, venture need css selector
                //fix label compatible with Beae - Pgage builder by tungnk
                if ((isProductPage || (window.location.pathname.includes("/pages") && $(".beae-builder") && $(".beae-builder").length)) && item.label_on_image == '1' && (BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd') && labeledParent) {
                    isActive = fixFirstImageLabel($, BSS_PL, parent, isActive, index, page, labeledParent)
                }
                //remove label in custom page
                var customPageArr = item.custom_page == null ? [] : item.custom_page.split(',');
                if (item.check_custom_page === 'true') {
                    if (BSS_PL.storeId == 13399 && window.location.pathname == "/pages/catalog-search-results") {
                        isActive = false;
                    } else if (BSS_PL.storeId == 31838) {
                        for (let i = 0; i < customPageArr.length; i++) {//cant not use indexOf because home page do not show label
                            let str = customPageArr[i].replace(/ /g, ''); //delete space
                            if (window.location.href.includes(str)) {
                                isActive = false;
                            }
                        }
                    } else {
                        for (let i = 0; i < customPageArr.length; i++) {//cant not use indexOf because home page do not show label
                            let str = customPageArr[i].replace(/ /g, ''); //delete space
                            if (str === window.location.href) {
                                isActive = false;
                            }
                        }
                    }
                }
                //check product price range
                if ((BSS_PL.currentPlan == 'ten_usd' && item.enable_price_range == 1) || (BSS_PL.currentPlan == 'twenty_usd' && item.enable_price_range == 1)) {
                    if (item.product_type == 4) {
                        if (prod.variants.length) {
                            prod.variants.forEach(function (variant) {
                                if (item.price_range_from == null && parseFloat(variant.price / 100) > parseFloat(item.price_range_to)) {
                                    prod.variants = prod.variants.filter(function (item) {
                                        return item.id != variant.id;
                                    });
                                } else if (item.price_range_to == null && parseFloat(variant.price / 100) < parseFloat(item.price_range_form)) {
                                    prod.variants = prod.variants.filter(function (item) {
                                        return item.id != variant.id;
                                    });
                                } else if (parseFloat(variant.price / 100) < parseFloat(item.price_range_from) || parseFloat(variant.price / 100) > parseFloat(item.price_range_to)) {
                                    prod.variants = prod.variants.filter(function (item) {
                                        return item.id != variant.id;
                                    });
                                }
                            });
                            if (!prod.variants.length) {
                                isActive = false;
                            }
                        } else {
                            isActive = false;
                        }
                    } else {
                        if (item.price_range_from == null && parseFloat(prod.price / 100) > parseFloat(item.price_range_to)) {
                            isActive = false;
                        } else if (item.price_range_to == null && parseFloat(prod.price / 100) < parseFloat(item.price_range_form)) {
                            isActive = false;
                        } else if (parseFloat(prod.price / 100) < parseFloat(item.price_range_from) || parseFloat(prod.price / 100) > parseFloat(item.price_range_to)) {
                            isActive = false;
                        }
                    }
                }
                if ((BSS_PL.currentPlan == "ten_usd" || BSS_PL.currentPlan == 'twenty_usd') && item.enable_product_publish == 1) {
                    // convert publish date by XuTho
                    var convertDatePublish = prod.publish_at.replace(/ /g, "T").slice(0, prod.publish_at.length - 6);
                    var publishAt = new Date(convertDatePublish).getTime();
                    if (publishAt < new Date(item.product_publish_from).getTime() && (item.product_publish_to == null || item.product_publish_to == '')) {
                        isActive = false;
                    } else if (publishAt > new Date(item.product_publish_to).getTime() && item.product_publish_from == null || item.product_publish_from == '') {
                        isActive = false;
                    }
                    else if (publishAt < new Date(item.product_publish_from).getTime() || (new Date(item.product_publish_to).getTime() > 0 && publishAt > new Date(item.product_publish_to).getTime())) {
                        isActive = false;
                    }
                }
                if ((BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd') && item.label_text_enable && item.enable_countdown_timer == 1 && item.option_end_countdown == 1 && new Date().getTime() > new Date(item.countdown_time).getTime()) {
                    isActive = false;
                }

                var isActiveVariant = true;
                if (item.product_type == 4 && isCartPage && prod.variants.length) {
                    let idArray = prod.variants.map(function (obj) {
                        return obj.id;
                    });
                    const idVariant = +$(parent).attr("id-variant")
                    isActiveVariant = idArray.includes(idVariant) ? true : false
                }

                if (isActive && isActiveVariant) {
                    if (item.img_url || (item.label_text_enable && item.label_text) || item.public_url_s3.length || item.enable_multi_badge) {
                        if ((BSS_PL.storeId <= BSS_PL.storeIdCustomOld || (BSS_PL.storeId > BSS_PL.storeIdCustomOld && (BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd'))) && item.product_type == 1) {
                            if (item.collection && res.collects && res.collects.length) {
                                var collections = item.collection.split(',');
                                var prodCol = res.collects.filter(function (item) {
                                    return $.inArray(item.toString(), collections) !== -1;
                                });
                                if (!prodCol.length) {
                                    return;
                                }
                            } else {
                                return;
                            }

                        } else if ((BSS_PL.storeId <= BSS_PL.storeIdCustomOld || (BSS_PL.storeId > BSS_PL.storeIdCustomOld && (BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd'))) && item.product_type == 2) {
                            if (item.tags) {
                                let tags = item.tags.split(',');
                                let prodTags = prod.tags;
                                if (tags.length) {
                                    if (prodTags.length) {
                                        let eqTags = tags.filter(function (tag) {
                                            return prodTags.indexOf(tag) !== -1
                                        });
                                        if (!eqTags.length) {
                                            return;
                                        }

                                    } else {
                                        return;
                                    }
                                } else {
                                    return;
                                }
                            } else {
                                return
                            }
                        } else if (BSS_PL.currentPlan == 'twenty_usd' && item.product_type == 4) {
                            if (item.variant) {
                                var variants = item.variant.split(',');
                                var prodVariants = prod.variants.map((variant) => variant.id);
                                if (variants.length) {
                                    if (item.label_type === 2) {
                                        if (!prodVariants.length) return;
                                        if (BSS_PL.storeId == 11362) {
                                            const currentProduct = JSON.parse(document.querySelector('#bss-pl-product-infor').innerText);
                                            let variantId = BSS_PL.getCurrentVariant(currentProduct);
                                            if (!item.variant.includes(variantId)) return;
                                        } else {
                                            // handle the parent closest to the cart form (in cart page)
                                            if ($(parent).closest('form[action="/cart"]').length && !$(parent).closest('#CartDrawer').length) {
                                                const variantTag = traverseParentToFindElementBySelector($, parent, '[href*="?variant="]')
                                                if (!variantTag) return;
                                                const variantPatternReg = /variant=\w+[^&]/;
                                                const variantPattern = variantPatternReg.exec($(variantTag).attr('href'));
                                                if (!variantPattern) return;
                                                const variantId = variantPattern[0].split("=")[1];
                                                if (variants.some(variant => variant === variantId)) {
                                                    variantPChoice = prod.variants.filter(item => variants.includes((item.id).toString())).find(variant => variant.id.toString() === variantId)
                                                } else return;
                                            } else {
                                                const firstLoadVariantEl = document.querySelector('#bss-variant-id-first-load');
                                                const queryString = location.search;
                                                const variantIdUrl = queryString.includes("?variant=") && queryString.substring(queryString.indexOf("?variant=") + "?variant=".length).split("&")[0]
                                                let variantId = variantIdUrl || firstLoadVariantEl && firstLoadVariantEl.innerHTML;

                                                if (!variantId || !variants.includes(variantId) || !prodVariants.includes(Number(variantId))) return;

                                                if (prodVariants.length) {
                                                    let eqVariants = variants.filter(function (variant) {
                                                        return prodVariants.indexOf(+variant) !== -1
                                                    });
                                                    let prodVariantsChoice = prod.variants.filter(item => variants.includes((item.id).toString()))
                                                    if (!eqVariants.length) {
                                                        return;
                                                    } else {
                                                        if (firstLoadVariantEl) {
                                                            variantPChoice = prodVariantsChoice.find((variant) => {
                                                                if (variant.id == variantId) {
                                                                    return variant;
                                                                }
                                                            })
                                                        }
                                                    }

                                                } else {
                                                    return;
                                                }
                                            }
                                        }
                                    } else {
                                        if (BSS_PL.storeId == 11362) {
                                            const currentProduct = JSON.parse(document.querySelector('#bss-pl-product-infor').innerText);
                                            let variantId = BSS_PL.getCurrentVariant(currentProduct);
                                            if (item.variant.includes(variantId)) {
                                                if ($(window).width() > 600) {
                                                    $('.bss-variant').attr('appendVariant', 'true')
                                                } else {
                                                    $('.bss-variant').closest(".product-gallery__container").find('.product-gallery-list').attr('appendVariant', 'true');
                                                }
                                            } else {
                                                return
                                            }
                                        } else if ($('img[bss-product-label-variant]').length) { // fix variant with add variant id to theme by XuTho
                                            let imgVariant = $(parent).find('img');
                                            if (BSS_PL.storeId == 13303) {
                                                imgVariant = $('img.feature-row__image.product-featured-media')
                                            }
                                            if ($(imgVariant).attr('bss-product-label-variant') && variants && variants != undefined && variants.indexOf($(imgVariant).attr('bss-product-label-variant').toString()) !== -1) {
                                                // fix for adioffice by XuTho
                                                if (BSS_PL.storeId == 18606 || BSS_PL.storeId == 13303) {
                                                    if (item.variant.indexOf($(imgVariant).attr('bss-product-label-variant')) !== -1) {
                                                        let idVariant = window.location.search.slice(window.location.search.indexOf('?variant=') + 9, window.location.search.indexOf('?variant=') + 23)
                                                        $(`[bss-product-label-variant=${idVariant}]`).parent().attr('appendVariant', 'true')
                                                    }
                                                } else {
                                                    variantPChoice = prod.variants.find((variant) => variant.id == $(imgVariant).attr('bss-product-label-variant'));
                                                    if (variantPChoice && variantPChoice.id) {
                                                        $(imgVariant).parent().attr('appendVariant', 'true')
                                                    }
                                                }
                                            } else {
                                                return;
                                            }
                                        } else {
                                            if (prodVariants.length) {
                                                var variantIdOnFirstLoad = document.querySelector('#bss-variant-id-first-load')
                                                var eqVariants = variants.filter(function (variant) {
                                                    return prodVariants.indexOf(+variant) !== -1
                                                });
                                                var prodVariantsChoice = prod.variants.filter(item => variants.includes((item.id).toString()))
                                                if (!eqVariants.length) {
                                                    return;
                                                } else {
                                                    //fix inglotbenelux 20031 by thienpk
                                                    let fixStoreId = [16685, 20031, 25034]
                                                    if (fixStoreId.indexOf(BSS_PL.storeId) != -1) {
                                                        let imgDiv = $(parent).find("img:first").attr('srcset');
                                                        if (!imgDiv) {
                                                            return;
                                                        }
                                                        if (imgDiv) {
                                                            // eslint-disable-next-line
                                                            imgDiv = imgDiv.replace(/\_\d+x\d+|\_\d+x/, '')
                                                            // replace the query parameters at 2nd,3rd,...
                                                            imgDiv = imgDiv.replace(/&[\w=]+/g, '')
                                                        }
                                                        variantPChoice = prodVariantsChoice.find((variant) => {
                                                            return imgDiv.includes(variant.image)
                                                        });
                                                        if (!variantPChoice) {
                                                            return;
                                                        }
                                                    } else {
                                                        //label for product variant
                                                        if (variantIdOnFirstLoad) {
                                                            var handleVariantIdProductPage
                                                            var pathName = window.location.search;
                                                            if (pathName.indexOf('?variant=') !== -1) {
                                                                var path = pathName.split('=');
                                                                if (BSS_PL.storeId == 19111) {
                                                                    handleVariantIdProductPage = pathName.includes("?variant=") && pathName.substring(pathName.indexOf("?variant=") + "?variant=".length).split("&")[0]
                                                                } else {
                                                                    handleVariantIdProductPage = path[path.length - 1];
                                                                }
                                                            } else {
                                                                handleVariantIdProductPage = JSON.parse(variantIdOnFirstLoad.innerText);
                                                            }
                                                            variantPChoice = prodVariantsChoice.find((variant) => {
                                                                if (variant.id == handleVariantIdProductPage) {
                                                                    return variant;
                                                                }
                                                            })
                                                            if (variantPChoice) {
                                                                var variantImg = variantPChoice.image;
                                                                var variantMediaId = variantPChoice.feature_media_id;
                                                            } else {
                                                                variantImg = null;
                                                                variantMediaId = null;
                                                            }

                                                            if (item.variant.includes(handleVariantIdProductPage) && variantImg !== null) {
                                                                //fix storeID variant have multi image
                                                                let fixStoreId = [21611, 19111, 20078]
                                                                if (fixStoreId.indexOf(BSS_PL.storeId) != -1) {
                                                                    $(parent).find('img').parent().not('.bss_pl_img').attr('appendVariant', 'true')
                                                                }
                                                                else if ([27809, 11305, 20432, 12388, 28027, 31082, 32692, 5590, 20496, 36181, 36860].indexOf(BSS_PL.storeId) != -1) {
                                                                    $('.bss-variant').find('img').parent().not('.bss_pl_img').attr('appendVariant', 'true')
                                                                } else {
                                                                    let parentMediaId = $(parent).closest('[bss-pl-media-id]').attr("bss-pl-media-id")
                                                                    if (parentMediaId == variantMediaId) {
                                                                        $(`[bss-pl-media-id="${variantMediaId}"]`).find('img').parent().not('.bss_pl_img').attr('appendVariant', 'true')
                                                                    } else {
                                                                        return;
                                                                    }
                                                                }
                                                            } else {
                                                                return;
                                                            }
                                                        }
                                                        else {
                                                            // handle the parent closest to the cart form (in cart page)
                                                            if ($(parent).closest('form[action="/cart"]').length && !$(parent).closest('#CartDrawer').length) {
                                                                const variantTag = traverseParentToFindElementBySelector($, parent, '[href*="?variant="]')
                                                                if (!variantTag) return;
                                                                const variantPatternReg = /variant=\w+[^&]/;
                                                                const variantPattern = variantPatternReg.exec($(variantTag).attr('href'));
                                                                if (!variantPattern) return;
                                                                const variantId = variantPattern[0].split("=")[1];
                                                                if (variants.some(variant => variant === variantId)) {
                                                                    variantPChoice = prodVariantsChoice.find(variant => variant.id.toString() === variantId)
                                                                } else return;
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                return;
                                            }
                                        }
                                    }
                                } else {
                                    return;
                                }
                            } else {
                                return
                            }
                        } else if (item.product_type == 3) {
                            //Don't need to filter any item, apply to all product
                        }
                        else {
                            if (BSS_PL.storeId !== 32043 && item.product) {
                                var productIds = item.product.split(',');
                                if ($.inArray(prod.id.toString(), productIds) == -1) {

                                    return;

                                }

                            } else {
                                return;
                            }

                        }
                        if ((BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd') && item.exclude_products == 5) {
                            if (item.excludeTags) {
                                let tags = item.excludeTags.split(',');
                                let prodTags = prod.tags;
                                if (tags.length) {
                                    let eqTags = tags.filter(function (tag) {
                                        return prodTags.indexOf(tag) !== -1
                                    });
                                    if (eqTags.length) {
                                        return;
                                    }
                                } else {
                                    return;
                                }
                            } else {
                                // apply label to all product
                            }
                        }
                        if ((BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd') && item.exclude_products == 7) {
                            if (item.exclude_product_ids) {
                                if (item.exclude_product_ids.includes(prod.id)) return
                            }
                        }
                        if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                            // do nothing
                        } else {
                            if (item.priority || item.priority == 0) {
                                if (!item.label_text_enable) {
                                    if (typeof filterPriority[!checkPCScreen ? item.mobile_position : item.position] != "undefined" && filterPriority[!checkPCScreen ? item.mobile_position : item.position] < item.priority) {
                                        return;
                                    }
                                }
                            }
                        }
                        let className = '';
                        let styleName = '';
                        let styleForLabelText = '';
                        let fixedTop = (checkBrowserIsFirefox == -1 && item.label_type == 1) ? ' top: -0.5px; ' : '';
                        let fixedLeft = (checkBrowserIsFirefox == -1 && item.label_type == 1) ? ' left: -0.5px; ' : '';
                        if (item.label_type == 1 || item.label_type == null) {
                            if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                                // do nothing
                            } else {
                                className = 'bss-pl-top-left';
                                switch (!checkPCScreen ? item.mobile_position : item.position) {
                                    case 1:
                                        className = 'bss-pl-top-center';
                                        break;
                                    case 2:
                                        className = 'bss-pl-top-right';
                                        break;
                                    case 3:
                                        className = 'bss-pl-middle-left';
                                        break;
                                    case 4:
                                        className = 'bss-pl-middle-center';
                                        break;
                                    case 5:
                                        className = 'bss-pl-middle-right';
                                        break;
                                    case 6:
                                        className = 'bss-pl-bottom-left';
                                        break;
                                    case 7:
                                        className = 'bss-pl-bottom-center';
                                        break;
                                    case 8:
                                        className = 'bss-pl-bottom-right';
                                        break;
                                }
                            }
                        } else {
                            if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                                // do nothing
                            } else {
                                className = 'bss-pb-bottom-left';
                                switch (!checkPCScreen ? item.mobile_position : item.position) {
                                    case 1:
                                        className = 'bss-pb-bottom-center';
                                        break;
                                    case 2:
                                        className = 'bss-pb-bottom-right';
                                        break;
                                }
                            }
                        }

                        if ($(parent).hasClass('hide')) {
                            $(parent).addClass('hide-clone').removeClass('hide')
                        }
                        // let parentProdH = $(parent).outerHeight();
                        // let imgProdH = $(parent).find('img').outerHeight();
                        var parentProdW = $(parent).outerWidth();
                        var parentProdH = $(parent).outerHeight();
                        if ($(parent).hasClass('hide-clone')) {
                            $(parent).addClass('hide').removeClass('hide-clone')
                        }
                        // if ($.inArray(!checkPCScreen ? item.mobile_position : item.position, [3, 4, 5, 6, 7, 8]) !== -1) {
                        //  styleName += 'bottom: ';
                        //  styleName += parseFloat(parentProdH) - parseFloat(imgProdH);
                        //  styleName += 'px;';
                        // }
                        if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                            // do nothing
                        } else {
                            if (!item.label_text_enable) {
                                if ($.inArray(!checkPCScreen ? item.mobile_position : item.position, [1, 2, 4, 5, 7, 8]) !== -1) {
                                    styleName += 'right: ';
                                    if ($(parent).hasClass('product-card--list')) {
                                        //Comment to fix bugs wrong label position on product card list of Express theme
                                        //styleName += parseFloat(parentProdW) - parseFloat(imgProdW);
                                    } else if ($(parent).hasClass('cart__image-wrapper')) {
                                        let widthImgEl = $(parent).find('img').width();
                                        let marginLeftRightImg = ($(parent).width() - widthImgEl) / 2;

                                        styleName += parseFloat(parentProdW) - parseFloat($(parent).width()) + marginLeftRightImg;
                                    } else if ($(parent).hasClass('featured-product__photo')) {
                                        styleName += 0;
                                    } else {
                                        //styleName += parseFloat(parentProdW) - parseFloat($(parent).parent().width());
                                        styleName += 0;
                                    }
                                    if ($(parent).hasClass('cart__image-wrapper')) {
                                        styleName += 'px !important;';
                                    } else {
                                        styleName += 'px;';
                                    }
                                }
                                if ($.inArray(!checkPCScreen ? item.mobile_position : item.position, [6, 7, 8]) !== -1) {
                                    if ($(parent).hasClass('cart__image-wrapper')) {
                                        let heightImgEl = $(parent).find('img').height();
                                        styleName += 'bottom: ';
                                        styleName += parseFloat(parentProdH) - parseFloat(heightImgEl)
                                        styleName += 'px !important;';
                                    }
                                }
                                if ($.inArray(!checkPCScreen ? item.mobile_position : item.position, [2, 5, 8]) !== -1) {
                                    styleName += 'left: auto !important;';
                                } else if ($.inArray(!checkPCScreen ? item.mobile_position : item.position, [0, 3, 6]) !== -1) {
                                    if ($(parent).hasClass('cart__image-wrapper')) {
                                        styleName += 'left: ';
                                        let widthImgEl = $(parent).find('img').width();
                                        let marginLeftRightImg = ($(parent).width() - widthImgEl) / 2;
                                        if (marginLeftRightImg) styleName += marginLeftRightImg;
                                        else styleName += 0;
                                        styleName += 'px !important;';
                                    }
                                }
                            }
                        }
                        var imgUrl = res.baseImgUrl + item.img_url;
                        if (item.public_img_url) {
                            imgUrl = item.public_img_url;
                        } else {
                            imgUrl = item.public_url_s3;
                        }
                        if (item.label_text_enable && item.label_text && item.label_text != '') {
                            styleForLabelText = styleName + BSS_PL.resizeLabelText(item);
                            if (!checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                                BSS_PL.handlePositionInPlatinum(item, parent, page)
                                var unlimitedCss = unlimitedCssFixBugForStores($, BSS_PL, item, parent)
                                styleForLabelText += unlimitedCss
                            }
                        }
                        styleName += BSS_PL.resizeImage(item);

                        //Define width, height of canvas
                        const WIDTHCANVAS = 500;
                        const HEIGHTCANVAS = 500;

                        let width = item[`${deviceName}_label_unlimited_width`]
                        let height = item[`${deviceName}_label_unlimited_height`]
                        let top = item[`${deviceName}_label_unlimited_top`]
                        let left = item[`${deviceName}_label_unlimited_left`]
                        let topPer = top + '%'
                        let leftPer = left + '%'

                        if (BSS_PL.currentPlan == 'twenty_usd' && item[`${deviceName}_fixed_percent_label`] == 0) {
                            if (top > (height / HEIGHTCANVAS * 100)) {
                                topPer = `calc(${top + (height / HEIGHTCANVAS * 100) - (height != -1 ? height / 10 : width / 10)}% - ${height}px)`
                            }
                            if (left > (width / WIDTHCANVAS * 100)) {
                                leftPer = `calc(${left + (width / WIDTHCANVAS * 100) - (width / 10)}% - ${width}px)`
                            }
                        }

                        if (!checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                            BSS_PL.handlePositionInPlatinum(item, parent, page)
                            styleName += `top : ${topPer} !important; left : ${leftPer} !important;`
                        }
                        let labelTypeClass = 'bss-pl-frontend';
                        if (item.label_type == 2) {
                            labelTypeClass = 'bss-pb-frontend';
                        }
                        var zIndexLabelImage = "z-index:4;" //thong, HoanPV, HuyNT
                        if (Shopify && Shopify.theme && Shopify.theme.name && ((freeTheme.includes(Shopify.theme.name) && (page == 'collections' || window.location.pathname.includes('/cart'))) || Shopify.theme.name.includes("Spotlight") || (Shopify.theme.name.includes("Colorblock") && page == 'products'))) {
                            let selectItem = (!document.querySelector('#shopify-section-header')) ? document.querySelector('.shopify-section-group-header-group.section-header') : document.querySelector('#shopify-section-header')
                            setTimeout(function () {
                                selectItem.style.zIndex = '7';
                            }, 500);
                        }
                        if (Shopify && Shopify.theme && Shopify.theme.name && (Shopify.theme.name.includes("Dawn") || Shopify.theme.name.includes("Sense"))) {
                            zIndexLabelImage = 'z-index: 2;';
                            if (page == 'products' && BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd') {
                                zIndexLabelImage = 'z-index: 3;';
                                let selectItem = (!document.querySelector('#shopify-section-header')) ? document.querySelector('.shopify-section-group-header-group.section-header') : document.querySelector('#shopify-section-header')
                                setTimeout(function () {
                                    selectItem.style.zIndex = '5';
                                }, 500);
                            }
                        }
                        if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.includes("Debut")) {
                            if (BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd') {
                                let selectItem = document.querySelectorAll('.full-width-link');
                                setTimeout(function () {
                                    for (let item of selectItem) {
                                        item.style.zIndex = '0';
                                    }
                                }, 500);
                            }
                        }

                        let textHoverValue;
                        let linkTextHoverValue;
                        let targetValue;
                        let checkStatusLink = true;
                        if (item.statusLabelHoverText == 1) {
                            textHoverValue = item.toolTipText ? unescape(item.toolTipText) : '';
                            targetValue = item.labelHoverTextLink ? '_blank' : '_self';
                            if (item.labelHoverTextLink) {
                                checkStatusLink = true
                                linkTextHoverValue = item.labelHoverTextLink
                            } else {
                                checkStatusLink = false;
                                linkTextHoverValue = 'javascript:void(0)';
                            }
                        } else {
                            textHoverValue = '';
                            linkTextHoverValue = 'javascript:void(0)';
                            targetValue = '_self';
                            checkStatusLink = false;
                        }
                        if (!item.enable_multi_badge) {
                            if (item.label_type == 2 && item.desktop_show_badges == 0 && checkPCScreen) {
                                return;
                            } else if (item.label_type == 2 && item.mobile_show_badges == 0 && !checkPCScreen) {
                                return;
                            } else if (item.label_type == 1 && item.mobile_show_labels == 0 && !checkPCScreen) {
                                return;
                            } else if (item.label_type == 1 && item.desktop_show_labels == 0 && checkPCScreen) {
                                return;
                            } else if (item.statusLabelHoverText == 1 && (BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd')) {
                                // eslint-disable-next-line
                                var imgTag = `<img bss-config-id=${item.label_id} data-tooltip="${textHoverValue}" src="${imgUrl}" alt="${item.statusLabelAltText == 1 ? item.labelAltText : item.name}" class="${labelTypeClass} ${className}${animationClassName}${checkStatusLink ? 'bss_pl_text_hover_link_enable' : 'bss_pl_text_hover_link_disable'}"  style="${zIndexLabelImage} ${styleName}; position: absolute !important; background-color: transparent; display: block; min-height: auto !important; transform: rotate(${item.angle}deg) ; transform-origin: top left; " onclick="window.open('${linkTextHoverValue}', '${targetValue}')"/>`;
                                createToolTip(textHoverValue);
                            } else {
                                imgTag = `<img bss-config-id=${item.label_id} src="${imgUrl}" alt="${item.statusLabelAltText == 1 ? item.labelAltText : item.name}" class="${labelTypeClass} ${className}${animationClassName}${checkStatusLink ? 'bss_pl_text_hover_link_enable' : 'bss_pl_text_hover_link_disable'}"  style="${zIndexLabelImage} ${styleName}; position: absolute !important; background-color: transparent; display: block; min-height: auto !important; transform: rotate(${item.angle}deg) ; transform-origin: top left; " />`;
                            }
                            if (BSS_PL.storeId == 17952 && window.location.pathname == '/pages/search-results-page' && !item.label_text_enable) {
                                imgTag = '<img bss-config-id=${item.label_id} src="' + imgUrl + '" alt="' + item.name + '" class="' + labelTypeClass + ' ' + className + animationClassName + '" style="' + styleName + '; position: absolute !important; background-color: transparent; display: block; min-height: auto !important; margin: 0px !important;" />';
                            }
                        } else if (item.multipleBadge && item.multipleBadge.public_img_url) {
                            //for multiple badge config
                            const headerText = item.multipleBadge.header_text ? `
                                    <p
                                        class="bss-multiple-badge-text"
                                        style="
                                            text-align: ${item.multipleBadge.header_text_alignment == 2 ? "end" : item.multipleBadge.header_text_alignment == 1 ? "center" : "start"};
                                            font-size: ${item.multipleBadge.header_text_font_size}px;
                                            color: ${item.multipleBadge.header_text_color};
                                            font-style: ${parseInt(item.multipleBadge.header_text_style) % 2 == 1 ? "italic" : "normal"};
                                            font-weight: ${parseInt(item.multipleBadge.header_text_style) > 1 ? "bold" : "normal"};
                                            font-family: ${item.multipleBadge.header_text_font_family || "inherit"};
                                        "
                                    >
                                        ${unescape(item.multipleBadge.header_text)}
                                    </p>` : "";
                            if (item.label_type == 2 && item.desktop_show_badges == 0 && checkPCScreen) {
                                return;
                            } else if (item.label_type == 2 && item.mobile_show_badges == 0 && !checkPCScreen) {
                                return;
                            } else if (item.label_type == 1 && item.mobile_show_labels == 0 && !checkPCScreen) {
                                return;
                            } else if (item.label_type == 1 && item.desktop_show_labels == 0 && checkPCScreen) {
                                return;
                            } else {
                                /* eslint-disable */
                                imgTag = `<div bss-config-id=${item.label_id} class="bss-multiple-badge" style="margin-top: ${item.margin_top || 0}px">
                                    ${headerText}
                                    <div class="bss-multiple-badge-images" style="justify-content: ${item.position == 2 ? "end" : item.position == 1 ? "center" : "start"} ">
                                        ${item.multipleBadge.public_img_url.reduce((accumulator, url) => accumulator + `<img class="bss-pb-frontend" ${item.statusLabelHoverText == 1 ? `data-tooltip="${textHoverValue}"` : ""} src="${url}" alt="${item.statusLabelAltText == 1 ? item.labelAltText : item.name}"  ${checkStatusLink ? 'bss_pl_text_hover_link_enable' : 'bss_pl_text_hover_link_disable'}"  style="${zIndexLabelImage} ${styleName}; background-color: transparent; transform: rotate(${item.angle}deg) ; transform-origin: top left; " ${item.statusLabelHoverText == 1 ? `onclick="window.open('${linkTextHoverValue}', '${targetValue}')"` : ""} />`, "")}
                                    </div>
                                </div>`
                                /* eslint-enable */
                            }

                            if (item.statusLabelHoverText == 1) createToolTip(textHoverValue);
                        }
                        if (item.label_text_enable) {
                            var labelText = '';
                            if (item.label_text && item.label_text != '') {
                                var isShowLabelText = true;
                                var isContainSale = item.label_text.indexOf('{sale}') !== -1;
                                if (isContainSale && discount <= 0) {
                                    isShowLabelText = false;
                                }
                                if (BSS_PL.storeId == 18121) {
                                    totalQuantityInventory = totalQuantityInventory - (totalQuantityInventory % 10)
                                }

                                let checkPCScreen = $(window).width() > 768

                                var itemWidth;
                                var itemHeight;

                                if ((item.position == 9 && checkPCScreen) || (item.mobile_position == 9 && !checkPCScreen)) {
                                    itemWidth = !checkPCScreen ? item.mobile_label_unlimited_width : item.desktop_label_unlimited_width;
                                    itemHeight = !checkPCScreen ? item.mobile_label_unlimited_height : item.desktop_label_unlimited_height;
                                } else {
                                    if (!checkPCScreen) {
                                        itemWidth = item.mobile_width_label;
                                        itemHeight = item.mobile_height_label;
                                    } else {
                                        itemWidth = item.desktop_width_label;
                                        itemHeight = item.desktop_height_label;
                                    }
                                }
                                if ((item.desktop_fixed_percent_label && checkPCScreen) || (item.mobile_fixed_percent_label && !checkPCScreen)) {
                                    if (itemWidth > 100) {
                                        itemWidth = 100;
                                    }
                                    if (itemHeight > 100) {
                                        itemHeight = 100;
                                    }
                                }
                                if (isShowLabelText) {
                                    let labelTextContent = BSS_PL.getTranslationText(item)
                                    if (item.label_type == 2) {
                                        if (item.enable_badge_stock) {
                                            labelText = getBadgeStockHtml({
                                                totalQuantityInventory: totalQuantityInventory,
                                                configs: item.badge_stock_config,
                                                className: className + " " + labelTypeClass,
                                                styleForLabelText,
                                                badgeStockStyle: item.badge_stock_style,
                                                fontSize: checkPCScreen ? item.label_text_font_size : item.mobile_font_size_label,
                                                fontFamily: item.label_text_font_family || 'inherit',
                                                fontStyle: (item.label_text_style == 1 || item.label_text_style == 3) ? 'italic' : 'normal',
                                                fontWeight: (item.label_text_style == 2 || item.label_text_style == 3) ? 'bold' : 'normal',
                                                fontColor: item.label_text_color,
                                                altText: item.statusLabelAltText == 1 ? item.labelAltText : item.name,
                                                checkStatusLink,
                                                textHoverValue,
                                                linkTextHoverValue,
                                                targetValue,
                                                labelTextId: item.label_text_id
                                            })
                                        } else {
                                            let backgroundColor = parseInt(item.transparent_background) === 1 ? 'transparent' : item.label_text_background_color;
                                            let boxShadow = item.label_shadow + 'px ' + item.label_shadow + 'px ' + item.label_shadow + 'px ' + item.label_shadow_color;
                                            let borderRadius = item.label_border_radius + 'px';
                                            let shape = item.label_shape;
                                            let textAngle = (item.label_shape === 'trapezoid' || item.label_shape === 'triangle') ? (Math.atan2(itemWidth, itemWidth) * 180 / Math.PI) : 0;
                                            let textContent = unescape(labelTextContent);
                                            let emojiArray = item.emoji ? item.emoji.split(',') : [];
                                            let emojiPositionArray = item.emoji_position ? item.emoji_position.split(',') : [];
                                            if (item.enable_countdown_timer && textContent.indexOf('{start}') > -1) {
                                                textContent = textContent.replace('{start}', `<span class="bss-text-content-start-${item.label_text_id}">{start}</span>`)
                                            }
                                            if (item.enable_countdown_timer && textContent.indexOf('{end}') > -1) {
                                                textContent = textContent.replace('{end}', `<span class="bss-text-content-end-${item.label_text_id}">{end}</span>`)
                                            }
                                            //encode emoji
                                            for (let i = 0; i < emojiArray.length; i++) {
                                                if (emojiArray[i].length == 6) {
                                                    if (textContent.indexOf(String.fromCodePoint(emojiArray[i])) > -1) {
                                                        let spanEmoji = `<span class="bss-pl-text-emoji" style="width: ` + (checkPCScreen ? item.label_text_font_size : item.mobile_font_size_label) + `px; height: ` + (checkPCScreen ? item.label_text_font_size : item.mobile_font_size_label) + `px; display: inline-block; background-image: url(&quot;https://unpkg.com/emoji-datasource-facebook@5.0.1/img/facebook/sheets-256/64.png&quot;); background-size: 5700% 5700%; background-position: ` + emojiPositionArray[i] + `;"></span>`;//create element span emoji
                                                        let firstText = textContent.slice(0, textContent.indexOf(String.fromCodePoint(emojiArray[i])))
                                                        let secondText = textContent.slice(textContent.indexOf(String.fromCodePoint(emojiArray[i])) + 2)

                                                        textContent = firstText + spanEmoji + secondText
                                                    }
                                                }
                                            }
                                            //remove text emoji after encode
                                            for (let i = 127462; i < 127488; i++) {
                                                if (textContent.indexOf(String.fromCodePoint(i.toString())) > -1) {
                                                    let firstText = textContent.slice(0, textContent.indexOf(String.fromCodePoint(i.toString())))
                                                    let secondText = textContent.slice(textContent.indexOf(String.fromCodePoint(i.toString())) + 2)

                                                    textContent = firstText + secondText
                                                }
                                            }
                                            //show total quantity in badge text
                                            if (BSS_PL.storeId === 33588) {
                                                if (variantPChoice.inventory_management != "shopify" || (variantPChoice.quantity && variantPChoice.quantity <= 0)) {
                                                    textContent = textContent.replace("{inventory_quantity}", "0");
                                                }
                                            } else {
                                                if (inventoryQuantity === null && textContent.includes('{inventory_quantity}')) textContent = item.label_text_unlimited_stock;
                                            }
                                            if(inventoryQuantity){
                                                textContent = textContent.replace("{inventory_quantity}", inventoryQuantity)
                                            }else if(inventoryQuantity !== null && textContent.includes('{inventory_quantity}')){
                                                textContent = item.label_text_out_stock
                                            }

                                            //show min-price & max-price in label text
                                            if (maxPrice != minPrice) {
                                                textContent = textContent.replace("{min_price}", minPrice);
                                                textContent = textContent.replace("{max_price}", maxPrice);
                                            }
                                            else {
                                                textContent = textContent.replace("{min_price}", productPrice / 100);
                                                textContent = textContent.replace("{max_price}", productPrice / 100);
                                            }
                                            //show discount amount in badge text
                                            if (discountAmount < 0) {
                                                if (textContent.indexOf("{sale_amount}") > -1) {
                                                    if (themeFormatMoney[0] != '{') {
                                                        textContent = textContent.replace("{sale_amount}", formatMoney + -parseFloat(discountAmount / 100).toFixed(2));
                                                    } else {
                                                        textContent = textContent.replace("{sale_amount}", -parseFloat(discountAmount / 100).toFixed(2) + formatMoney);
                                                    }
                                                }
                                            } else {
                                                if(textContent == "{sale_amount}"){
                                                    return
                                                }else{
                                                    textContent = textContent.replace("{sale_amount}", '');
                                                }
                                            }
                                            var discountContent = parseInt(discount) + '%'
                                            // fix sale discount price, if discount is negative, then do not show anything (nadu fix)
                                            if (discount <= 0) {
                                                if(textContent == "{sale}"){
                                                    return
                                                }else{  
                                                    discountContent = ''
                                                }
                                            }
                                            textContent = textContent.replace("{sale}", discountContent);

                                            textContent = textContent.replace("{inventory}", getImageList.handleInventoryText($, prod, prodVariantSelected, item, parent));

                                            let marginTop = item.margin_top ? item.margin_top : 0;
                                            let position = ' position: absolute !important; ';
                                            if (BSS_PL.storeId == 16443 || BSS_PL.storeId == 13273 && isProductPage) {
                                                position = ' position: absolute; ';
                                            }
                                            if (BSS_PL.storeId == 19352 && isProductPage) {
                                                position = ' position: unset; ';
                                            }
                                            let zIndexLabelText = 'z-index: 4;';
                                            if (Shopify && Shopify.theme && Shopify.theme.name && ((freeTheme.includes(Shopify.theme.name) && (page == 'collections' || window.location.pathname.includes('/cart'))) || Shopify.theme.name.includes("Spotlight") || (Shopify.theme.name.includes("Colorblock") && page == 'products'))) {
                                                let selectItem = (!document.querySelector('#shopify-section-header')) ? document.querySelector('.shopify-section-group-header-group.section-header') : document.querySelector('#shopify-section-header')
                                                setTimeout(function () {
                                                    selectItem.style.zIndex = '7';
                                                }, 500);
                                            }
                                            if (Shopify && Shopify.theme && Shopify.theme.name && (Shopify.theme.name.includes("Dawn") || Shopify.theme.name.includes("Sense"))) {
                                                zIndexLabelImage = 'z-index: 2;';
                                                if (page == 'products' && BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd') {
                                                    zIndexLabelImage = 'z-index: 3;';
                                                    let selectItem = (!document.querySelector('#shopify-section-header')) ? document.querySelector('.shopify-section-group-header-group.section-header') : document.querySelector('#shopify-section-header')
                                                    setTimeout(function () {
                                                        selectItem.style.zIndex = '5';
                                                    }, 500);
                                                }
                                            }
                                            if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.includes("Debut")) {
                                                if (BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd') {
                                                    let selectItem = document.querySelectorAll('.full-width-link');
                                                    setTimeout(function () {
                                                        for (let item of selectItem) {
                                                            item.style.zIndex = '0';
                                                        }
                                                    }, 500);
                                                }
                                            }
                                            const squareShape = ["trapezoid", "triangle", "square", "circle"];
                                            if (item.label_type == 2 && item.desktop_show_badges == 0 && checkPCScreen) {
                                                return;
                                            } else if (item.label_type == 2 && item.mobile_show_badges == 0 && !checkPCScreen) {
                                                return;
                                            } else if (item.label_type == 1 && item.mobile_show_labels == 0 && !checkPCScreen) {
                                                return;
                                            } else if (item.label_type == 1 && item.desktop_show_labels == 0 && checkPCScreen) {
                                                return;
                                            } else {
                                                labelText = '<div class="bss_parent_text ' + className + `" bss-config-id=${item.label_text_id} ` + 'style="'
                                                    + styleForLabelText
                                                    + position + zIndexLabelText
                                                    + ' margin-top: ' + marginTop + 'px;'
                                                    + (item.label_shadow ? 'filter: drop-shadow(' + boxShadow + ');' : '')
                                                    + fixedTop
                                                    + fixedLeft
                                                    + '">'
                                                    + '<div alt="' + `${item.statusLabelAltText == 1 ? item.labelAltText : item.name}` + '" data-bss-pl-text-id="bss-pl-text-' + item.label_text_id + '" class="bss-countdown-display ' + labelTypeClass + animationClassName + ' bss_pl_label_text   bss-pl-' + shape + '" style="' + styleForLabelText + `display: flex; justify-content: center; align-items: center; text-align: center;`
                                                    + ' font-style: ' + ((item.label_text_style == 1 || item.label_text_style == 3) ? 'italic' : 'normal') + ';'
                                                    + ' font-weight: ' + ((item.label_text_style == 2 || item.label_text_style == 3) ? 'bold' : 'normal') + ';'
                                                    + ' color: ' + item.label_text_color + ';'
                                                    + ' width : 100% ;'
                                                    + (squareShape.includes(shape) ? 'height:100%;' : '')
                                                    + ' opacity: ' + item.label_opacity / 100 + ";"
                                                    + ' border-radius: ' + borderRadius + ';'
                                                    + ' opacity: ' + item.label_opacity / 100 + ";"
                                                    + ' font-size: ' + (checkPCScreen ? item.label_text_font_size : item.mobile_font_size_label) + 'px;'
                                                    + 'font-family:' + (item.label_text_font_family || 'inherit') + ';'
                                                    + position
                                                    // eslint-disable-next-line
                                                    + ' background-color: ' + backgroundColor + `;" ><span style="rotate: ` + textAngle + `deg;" class="bss_pl_text_hover_text ${checkStatusLink ? 'bss_pl_text_hover_link_enable' : 'bss_pl_text_hover_link_disable'}" data-tooltip="${textHoverValue}" onclick="window.open('${linkTextHoverValue}', '${targetValue}')">`
                                                    + '<div style="pointer-events:none">' + textContent + '</div>'
                                                    + '</span>'
                                                    + '</div>'
                                                    + '</div>';
                                            }
                                        }
                                    } else {
                                        configLabelText.push(item)
                                        let backgroundColor = parseInt(item.transparent_background) === 1 ? 'transparent' : item.label_text_background_color;
                                        let boxShadow = item.label_shadow + 'px ' + item.label_shadow + 'px ' + item.label_shadow + 'px ' + item.label_shadow_color;
                                        let borderRadius = item.label_border_radius + 'px';
                                        let shape = item.label_shape;
                                        let textAngle = (item.label_shape === 'trapezoid' || item.label_shape === 'triangle') ? (Math.atan2(itemHeight, itemWidth) * 180 / Math.PI) : 0;
                                        let textContent = unescape(labelTextContent);
                                        let marginTopLabelText = getConfigMarginTopLabel($, BSS_PL, item, parent, page, 1);
                                        let marginLeftLabelText = getConfigMarginLeftLabel($, BSS_PL, item, parent, page, 1);
                                        let emojiArray = item.emoji ? item.emoji.split(',') : [];
                                        let emojiPositionArray = item.emoji_position ? item.emoji_position.split(',') : [];
                                        if (item.enable_countdown_timer && textContent.indexOf('{start}') > -1) {
                                            textContent = textContent.replace('{start}', `<span class="bss-text-content-start-${item.label_text_id}">{start}</span>`)
                                        }
                                        if (item.enable_countdown_timer && textContent.indexOf('{end}') > -1) {
                                            textContent = textContent.replace('{end}', `<span class="bss-text-content-end-${item.label_text_id}">{end}</span>`)
                                        }
                                        //encode emoji
                                        for (let i = 0; i < emojiArray.length; i++) {
                                            if (emojiArray[i].length == 6) {
                                                if (textContent.indexOf(String.fromCodePoint(emojiArray[i])) > -1) {
                                                    let spanEmoji = `<span class="bss-pl-text-emoji" style="width: ` + (checkPCScreen ? item.label_text_font_size : item.mobile_font_size_label) + `px; height: ` + (checkPCScreen ? item.label_text_font_size : item.mobile_font_size_label) + `px; display: inline-block; background-image: url(&quot;https://unpkg.com/emoji-datasource-facebook@5.0.1/img/facebook/sheets-256/64.png&quot;); background-size: 5700% 5700%; background-position: ` + emojiPositionArray[i] + `;"></span>`;//create element span emoji
                                                    let firstText = textContent.slice(0, textContent.indexOf(String.fromCodePoint(emojiArray[i])))
                                                    let secondText = textContent.slice(textContent.indexOf(String.fromCodePoint(emojiArray[i])) + 2)

                                                    textContent = firstText + spanEmoji + secondText
                                                }
                                            }
                                        }
                                        //remove text emoji after encode
                                        for (let i = 127462; i < 127488; i++) {
                                            if (textContent.indexOf(String.fromCodePoint(i.toString())) > -1) {
                                                let firstText = textContent.slice(0, textContent.indexOf(String.fromCodePoint(i.toString())))
                                                let secondText = textContent.slice(textContent.indexOf(String.fromCodePoint(i.toString())) + 2)

                                                textContent = firstText + secondText
                                            }
                                        }
                                        //show min-price & max-price in label text
                                        if (maxPrice != minPrice) {
                                            textContent = textContent.replace("{min_price}", minPrice);
                                            textContent = textContent.replace("{max_price}", maxPrice);
                                        }
                                        else {
                                            textContent = textContent.replace("{min_price}", productPrice / 100);
                                            textContent = textContent.replace("{max_price}", productPrice / 100);
                                        }
                                        //show total quantity in label text
                                        if (inventoryQuantity === null && textContent.includes('{inventory_quantity}')) textContent = item.label_text_unlimited_stock;
                                        if(inventoryQuantity){
                                          textContent = textContent.replace("{inventory_quantity}", inventoryQuantity)
                                        }else if(inventoryQuantity !== null && textContent.includes('{inventory_quantity}')){
                                          textContent = item.label_text_out_stock
                                        }

                                        //show discount amount in label text
                                        if (item.product_type == 4) {
                                            var discountAmountVariantP = variantPChoice && variantPChoice.price - variantPChoice.compare_at_price;
                                            if (discountAmountVariantP < 0) {
                                                if (textContent.indexOf("{sale_amount}") > -1) {
                                                    if (themeFormatMoney[0] != '{') {
                                                        textContent = textContent.replace("{sale_amount}", formatMoney + -parseFloat(discountAmountVariantP / 100).toFixed(2));
                                                    } else {
                                                        textContent = textContent.replace("{sale_amount}", -parseFloat(discountAmountVariantP / 100).toFixed(2) + formatMoney);
                                                    }
                                                }
                                            } else {
                                                if(textContent == "{sale_amount}"){
                                                    return
                                                }else{
                                                    textContent = textContent.replace("{sale_amount}", '');
                                                }
                                            }
                                        } else {
                                            if (discountAmount < 0) {
                                                if (textContent.indexOf("{sale_amount}") > -1) {
                                                    if (themeFormatMoney[0] != '{') {
                                                        textContent = textContent.replace("{sale_amount}", formatMoney + -parseFloat(discountAmount / 100).toFixed(2));
                                                    } else {
                                                        textContent = textContent.replace("{sale_amount}", -parseFloat(discountAmount / 100).toFixed(2) + formatMoney);
                                                    }
                                                }
                                            } else {
                                                if(textContent == "{sale_amount}"){
                                                  return
                                                }else{
                                                  textContent = textContent.replace("{sale_amount}", '');
                                                }
                                            }
                                        }
                                        if (item.product_type == 4) {
                                            var discountVariantP = 0;
                                            if (variantPChoice && variantPChoice.compare_at_price > 0) {
                                                // fix round to int
                                                discountVariantP = parseFloat((((variantPChoice.compare_at_price - variantPChoice.price) / variantPChoice.compare_at_price) * 100).toFixed(0));
                                                if (isNaN(discountVariantP)) {
                                                    discountVariantP = 0;
                                                }
                                            } else {
                                                discountVariantP = -1;
                                            }
                                            let discountContentPA = parseInt(discountVariantP) + '%'
                                            if (discountVariantP <= 0) {
                                                if(textContent == "{sale}"){
                                                  return
                                                }else{  
                                                    discountContentPA = ''
                                                }
                                            }
                                            textContent = textContent.replace("{sale}", discountContentPA);
                                        } else {
                                            let discountContent = parseInt(discount) + '%'
                                            // fix sale discount price, if discount is negative, then do not show anything (nadu fix)
                                            if (discount <= 0) {
                                                if(textContent == "{sale}"){
                                                    return
                                                  }else{  
                                                    discountContent = ''
                                                  }
                                            }
                                            textContent = textContent.replace("{sale}", discountContent);
                                        }
                                        textContent = textContent.replace("{inventory}", getImageList.handleInventoryText($, prod, prodVariantSelected, item, parent))

                                        let position = ' position: absolute !important; ';
                                        if (BSS_PL.storeId == 13273 && isProductPage) {
                                            position = ' position: relative !important; ';
                                        }
                                        let zIndexLabelText = 'z-index: 4;';
                                        if (Shopify && Shopify.theme && Shopify.theme.name && ((freeTheme.includes(Shopify.theme.name) && (page == 'collections' || window.location.pathname.includes('/cart'))) || Shopify.theme.name.includes("Spotlight") || (Shopify.theme.name.includes("Colorblock") && page == 'products'))) {
                                            let selectItem = (!document.querySelector('#shopify-section-header')) ? document.querySelector('.shopify-section-group-header-group.section-header') : document.querySelector('#shopify-section-header')
                                            setTimeout(function () {
                                                selectItem.style.zIndex = '7';
                                            }, 500);
                                        }
                                        if (Shopify && Shopify.theme && Shopify.theme.name && (Shopify.theme.name.includes("Dawn") || Shopify.theme.name.includes("Sense"))) {
                                            zIndexLabelImage = 'z-index: 2;';
                                            if (page == 'products' && BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd') {
                                                zIndexLabelImage = 'z-index: 3;';
                                                let selectItem = (!document.querySelector('#shopify-section-header')) ? document.querySelector('.shopify-section-group-header-group.section-header') : document.querySelector('#shopify-section-header')
                                                setTimeout(function () {
                                                    selectItem.style.zIndex = '5';
                                                }, 500);
                                            }
                                        }
                                        if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.includes("Debut")) {
                                            if (BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd') {
                                                let selectItem = document.querySelectorAll('.full-width-link');
                                                setTimeout(function () {
                                                    for (let item of selectItem) {
                                                        item.style.zIndex = '0';
                                                    }
                                                }, 500);
                                            }
                                        }
                                        //fix cassa ferrro by ducduong
                                        if (BSS_PL.storeId == 19213) {
                                            zIndexLabelText = 'z-index: 2;';
                                        }
                                        // fix for callherdaddy by DuBD
                                        if (BSS_PL.storeId === 34193) {
                                            zIndexLabelText = 'z-index: 11;';
                                        }

                                        if (item.label_type == 2 && item.desktop_show_badges == 0 && checkPCScreen) {
                                            return;
                                        } else if (item.label_type == 2 && item.mobile_show_badges == 0 && !checkPCScreen) {
                                            return;
                                        } else if (item.label_type == 1 && item.mobile_show_labels == 0 && !checkPCScreen) {
                                            return;
                                        } else if (item.label_type == 1 && item.desktop_show_labels == 0 && checkPCScreen) {
                                            return;
                                        } else {
                                            // hover label text by HuyNT
                                            labelText = '<div class="bss_parent_text"' + ` bss-config-id=${item.label_text_id} ` + 'style="'
                                                + styleForLabelText
                                                + position + zIndexLabelText
                                                + ' margin-top: ' + marginTopLabelText + 'px;'
                                                + ' margin-left: ' + marginLeftLabelText + 'px;'
                                                + (item.label_shadow ? 'filter: drop-shadow(' + boxShadow + ');' : '')
                                                + fixedTop
                                                + fixedLeft
                                                + '">'
                                                + '<div alt="' + `${item.statusLabelAltText == 1 ? item.labelAltText : item.name}` + '" data-bss-pl-text-id="bss-pl-text-' + item.label_text_id + '" class="bss-countdown-display ' + labelTypeClass + animationClassName + ' bss_pl_label_text ' + 'bss-pl-' + shape + '" style="' + (BSS_PL.currentPlan == 'twenty_usd' ? '' : styleForLabelText) + `display: flex; justify-content: center; align-items: center; text-align: center;`
                                                + ' font-style: ' + ((item.label_text_style == 1 || item.label_text_style == 3) ? 'italic' : 'normal') + ';'
                                                + ' font-weight: ' + ((item.label_text_style == 2 || item.label_text_style == 3) ? 'bold' : 'normal') + ';'
                                                + ' color: ' + item.label_text_color + ';'
                                                + ' border-radius: ' + borderRadius + ';'
                                                + ' width:100%;height:100%;'
                                                + ' opacity: ' + item.label_opacity / 100 + ";"
                                                + ' font-size: ' + (checkPCScreen ? item.label_text_font_size : item.mobile_font_size_label) + 'px;'
                                                + 'font-family:' + (item.label_text_font_family || 'inherit') + ';'
                                                + position
                                                // eslint-disable-next-line
                                                + ' background-color: ' + backgroundColor + `;" ><span style="rotate: ` + textAngle + `deg;" class="bss_pl_text_hover_text ${checkStatusLink ? 'bss_pl_text_hover_link_enable' : 'bss_pl_text_hover_link_disable'}" data-tooltip="${textHoverValue}"  onclick="window.open('${linkTextHoverValue}', '${targetValue}')">`
                                                + '<div style="pointer-events:none">' + textContent + '</div>'
                                                + '</span>'
                                                + '</div>'
                                                + '</div>';
                                        }
                                    }
                                }
                            }
                            imgTag = labelText;
                            if (item.statusLabelHoverText == 1 && (BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd')) {
                                createToolTip(imgTag);
                            }

                            else if (BSS_PL.storeId == 27553) {
                                let marginTopLabelText = getConfigMarginTopLabel($, BSS_PL, item, parent, page, 0);
                                imgTag = imgTag.replace(` margin-top: ${marginTopLabelText}px !important;`, '')
                            }

                        }

                        // enable config for appLai review
                        let positionCheck = !checkPCScreen ? item.mobile_position : item.position;
                        let checkIntegration = Object(integrationWithOtherApps["a" /* default */])($, item, prod)
                        if (BSS_PL.integration.laiReview.status) {
                            if (checkIntegration) {
                                if (BSS_PL.storeId <= BSS_PL.storeIdOldWIthPriority) {
                                    if (item.label_type == 2) {
                                        // for badge
                                        if (itemsValid.length == 0) {
                                            if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                                                htmlList.push(imgTag)
                                            } else {
                                                if (item.label_text_enable) {
                                                    htmlLabelText.push(imgTag);
                                                } else {
                                                    htmlList[positionCheck] = imgTag;
                                                }
                                            }
                                            itemsValid.push(item);
                                        } else {
                                            itemsValid.map((label) => {
                                                // check if has same position
                                                if (label.position !== positionCheck) {
                                                    itemsValid.push(item);
                                                    if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                                                        htmlList.push(imgTag)
                                                    } else {
                                                        if (item.label_text_enable) {
                                                            htmlLabelText.push(imgTag);
                                                        } else {
                                                            htmlList[positionCheck] = imgTag;
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    } else if (BSS_PL.currentPlan == 'twenty_usd') {
                                        // for label (20$)
                                        if (itemsValid.length == 0) {
                                            if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                                                htmlList.push(imgTag)
                                            } else {
                                                if (item.label_text_enable) {
                                                    htmlLabelText.push(imgTag);
                                                } else {
                                                    htmlList[positionCheck] = imgTag;
                                                }
                                            }
                                            itemsValid.push(item);
                                        } else {
                                            itemsValid.map((label) => {
                                                // check if has same position
                                                if (((!checkPCScreen ? label.mobile_label_unlimited_left : label.desktop_label_unlimited_left) !== (!checkPCScreen ? item.mobile_label_unlimited_left : item.desktop_label_unlimited_left)) || (!checkPCScreen ? label.mobile_label_unlimited_top : label.desktop_label_unlimited_top) !== (!checkPCScreen ? item.mobile_label_unlimited_top : item.desktop_label_unlimited_top)) {
                                                    if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                                                        htmlList.push(imgTag)
                                                    } else {
                                                        if (item.label_text_enable) {
                                                            htmlLabelText.push(imgTag);
                                                        } else {
                                                            htmlList[positionCheck] = imgTag;
                                                        }
                                                    }
                                                    itemsValid.push(item);
                                                }
                                            });
                                        }
                                    } else {
                                        // for label basic plan
                                        if (itemsValid.length == 0) {
                                            if (item.label_text_enable) {
                                                htmlLabelText.push(imgTag);
                                            } else {
                                                htmlList[positionCheck] = imgTag;
                                            }
                                            itemsValid.push(item);
                                        } else {
                                            itemsValid.map((label) => {
                                                // check if has same position
                                                // label text
                                                if (item.label_text_enable) {
                                                    htmlLabelText.push(imgTag);
                                                } else {
                                                    // label image
                                                    if (label.position !== positionCheck) {
                                                        htmlList[positionCheck] = imgTag;
                                                    }
                                                }
                                                itemsValid.push(item);

                                            });
                                        }
                                    }
                                } else {
                                    if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                                        htmlList.push(imgTag)
                                    } else {
                                        // check badge
                                        if (item.label_type == 2) {
                                            if (checkBadge[positionCheck] !== true) {
                                                checkBadge[positionCheck] = true;
                                                htmlList.push(imgTag);
                                            }
                                        } else {
                                            if (item.label_text_enable) {
                                                htmlList.push(imgTag);
                                            } else {
                                                if (checkPriority[positionCheck] !== true) {
                                                    checkPriority[positionCheck] = true;
                                                    htmlList.push(imgTag);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (BSS_PL.storeId <= BSS_PL.storeIdOldWIthPriority) {
                                if (item.label_type == 2) {
                                    // for badge
                                    if (itemsValid.length == 0) {
                                        if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                                            htmlList.push(imgTag)
                                        } else {
                                            if (item.label_text_enable) {
                                                htmlLabelText.push(imgTag);
                                            } else {
                                                htmlList[positionCheck] = imgTag;
                                            }
                                        }
                                        itemsValid.push(item);
                                    } else {
                                        itemsValid.map((label) => {
                                            // check if has same position
                                            if (label.position !== positionCheck) {
                                                itemsValid.push(item);
                                                if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                                                    htmlList.push(imgTag)
                                                } else {
                                                    if (item.label_text_enable) {
                                                        htmlLabelText.push(imgTag);
                                                    } else {
                                                        htmlList[positionCheck] = imgTag;
                                                    }
                                                }
                                            }
                                        });
                                    }
                                } else if (BSS_PL.currentPlan == 'twenty_usd') {
                                    // for label (20$)
                                    if (itemsValid.length == 0) {
                                        if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                                            htmlList.push(imgTag)
                                        } else {
                                            if (item.label_text_enable) {
                                                htmlLabelText.push(imgTag);
                                            } else {
                                                htmlList[positionCheck] = imgTag;
                                            }
                                        }
                                        itemsValid.push(item);
                                    } else {
                                        itemsValid.map((label) => {
                                            // check if has same position
                                            if (((!checkPCScreen ? label.mobile_label_unlimited_left : label.desktop_label_unlimited_left) !== (!checkPCScreen ? item.mobile_label_unlimited_left : item.desktop_label_unlimited_left)) || (!checkPCScreen ? label.mobile_label_unlimited_top : label.desktop_label_unlimited_top) !== (!checkPCScreen ? item.mobile_label_unlimited_top : item.desktop_label_unlimited_top)) {
                                                if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                                                    htmlList.push(imgTag)
                                                } else {
                                                    if (item.label_text_enable) {
                                                        htmlLabelText.push(imgTag);
                                                    } else {
                                                        htmlList[positionCheck] = imgTag;
                                                    }
                                                }
                                                itemsValid.push(item);
                                            }
                                        });
                                    }
                                } else {
                                    // for label basic plan
                                    if (itemsValid.length == 0) {
                                        if (item.label_text_enable) {
                                            htmlLabelText.push(imgTag);
                                        } else {
                                            htmlList[positionCheck] = imgTag;
                                        }
                                        itemsValid.push(item);
                                    } else {
                                        itemsValid.map((label) => {
                                            // check if has same position
                                            // label text
                                            if (item.label_text_enable) {
                                                htmlLabelText.push(imgTag);
                                            } else {
                                                // label image
                                                if (label.position !== positionCheck) {
                                                    htmlList[positionCheck] = imgTag;
                                                }
                                            }
                                            itemsValid.push(item);

                                        });
                                    }
                                }
                            } else {
                                if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                                    htmlList.push(imgTag)
                                } else {
                                    // check badge
                                    if (item.label_type == 2) {
                                        if (checkBadge[positionCheck] !== true) {
                                            checkBadge[positionCheck] = true;
                                            htmlList.push(imgTag);
                                        }
                                    } else {
                                        if (item.label_text_enable) {
                                            htmlList.push(imgTag);
                                        } else {
                                            if (checkPriority[positionCheck] !== true) {
                                                checkPriority[positionCheck] = true;
                                                if (imgTag) {
                                                    htmlList.push(imgTag)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    BSS_PL.onClickThumbnailResizeMarginLabelText(configLabelText)
    if (BSS_PL.storeId <= BSS_PL.storeIdOldWIthPriority) {
        htmlList = htmlList.concat(htmlLabelText)
    }
    return htmlList;
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/badge/customElementSelector/findAppendElementForCustomSelector.js
/**
 * Finds the nearest element to a given element that matches a specific selector
 */
function findNearestElement(elem, selector) {
    let currentNode = elem;
    while (currentNode.parentNode && currentNode.parentNode.tagName.toLowerCase() !== "body" && !currentNode.classList.contains("shopify-section")) {
        const elemFound = currentNode.querySelector(selector);
        if (elemFound) return elemFound;
        currentNode = currentNode.parentNode;
    }
}

/**
 * Finds the element to which a custom badge should be appended and its position
 */
function findAppendElementForCustomSelector(parent, selectorData, pages) {
    // eslint-disable-next-line
    const [selector, _, position] = selectorData.split("&");
    if (pages === "products") {
        return {element: document.querySelector(selector), position}
    } 
    return {element: findNearestElement(parent, selector), position};
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/badge/customElementSelector/handleBadgeForCustomElementSelector.js


function handleBadgeForCustomElementSelector($, selector, htmlLabel, onlyImgTag, page, config, parent) {
    const {element, position} = findAppendElementForCustomSelector(parent, selector, page);
    if (!element) return;
    const configId = config.label_id || config.label_text_id;

    //handle duplicate badge
    const siblingElement = position === "0" ? element.nextElementSibling : element.previousElementSibling;
    if (siblingElement && siblingElement.classList.contains("bss_pb_img")) {
        if (config.enable_multi_badge) return;
        if (siblingElement.querySelector(".bss-multiple-badge")) return;
        for (const el of Array.from(siblingElement.querySelectorAll(".bss-pb-frontend"))) {
            const elementConfigId = Number(el.getAttribute("bss-config-id"));
            const positionClass = ["bss-pb-bottom-center", "bss-pb-bottom-right", "bss-pb-bottom-left"].find(className => el.classList.contains(className));
            if (onlyImgTag.includes(positionClass)) {
              if (configId < elementConfigId) return;
              el.style.display = "none";
            }
        }
        $(siblingElement).prepend(onlyImgTag);
        return;
    }

    if (position === "0") $(element).after(htmlLabel);
    else $(element).before(htmlLabel);
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/badge/initBadge.js














function initBadge(BSS_PL) {
    const squareShape = ["trapezoid", "triangle", "square", "circle"];
    const checkBadgeText = (item) => {
        return ((item.desktop_fixed_percent_label == 0 || item.mobile_fixed_percent_label == 0) || ((item.desktop_fixed_percent_label == 1 || item.mobile_fixed_percent_label == 1) && item.label_text_enable == 1));
    }
    BSS_PL.initForBadgeCustomSelector = function ($, BSS_PL, dataRes, parents, item, prodData, foundFirstImage, page, firstParent, mainProduct) {
        $.each(parents, function (index, parent) {
            let dataResCustomSelector = dataRes.filter((data) => {
                return data.custom_selector.length;
            });
            let firstPriority = 100;
            if (dataResCustomSelector.length) {
                $.each(dataResCustomSelector, function (index, dataSelector) {
                    let marginTop = BSS_PL.getMaxValueMarginTop(dataRes);
                    let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
                    let arrayData = [dataSelector];
                    let onlyImgTag = '';
                    let htmlLabel = '',
                        htmlList = getImageList_getImageList($, BSS_PL, arrayData, item, prodData, parent);
                    if (htmlList.length && !foundFirstImage) {
                        htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                        htmlLabel += htmlList.join('');
                        htmlLabel += '</div>';
                        onlyImgTag = htmlList.join('');
                        let selector = JSON.parse(dataSelector.custom_selector);
                        const { productPageSelector, collectionPageSelector, otherPageSelector, homePageSelector, searchPageSelector } = selector;
                        let currentPage = page;

                        if (window.location.pathname.includes("/search")) currentPage = "search";
                        if (Shopify.routes.root.includes(window.location.pathname)) currentPage = "";

                        let pageSelector;
                        switch (currentPage) {
                            case "products":
                                pageSelector = productPageSelector;
                                break;
                            case "collections":
                                pageSelector = collectionPageSelector;
                                break;
                            case "":
                                pageSelector = homePageSelector;
                                break;
                            case "search":
                                pageSelector = searchPageSelector;
                                break;
                            default:
                                pageSelector = otherPageSelector;
                        }

                        const isCustomElementSelector = pageSelector && pageSelector.split("&").length === 3;

                        if (isCustomElementSelector) {
                            if (!$(mainProduct).is(parent) && page === 'products') return;
                            handleBadgeForCustomElementSelector($, pageSelector, htmlLabel, onlyImgTag, page, dataSelector, parent);
                            return;
                        }

                        // check if is product page then apply custom selector
                        if ($(mainProduct).is(parent) && page == 'products') {
                            let element = $(productPageSelector);
                            if (!element || !element.length) return;
                            if (!element.next('.bss_pb_img').length) {
                                //customization for tailored-athlete by vitu
                                if (BSS_PL.storeId == 7915 || BSS_PL.storeId == 8091) {
                                    if (!$(element).find('.bss_pb_img').length) {
                                        element.before(htmlLabel)
                                    }
                                } else {
                                    element.after(htmlLabel)
                                }
                                firstPriority = dataSelector.priority;
                                element.next('.bss_pb_img').find('img').hide();

                                let width = 0;
                                let height = 0;
                                let imgBadge = $(element).next().find('img.bss-pb-frontend')
                                dataRes.forEach((dataRes) => {
                                    if (checkBadgeText(dataRes)) {
                                        if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                            setTimeout(function () {
                                                height = $(element).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                                height = parseInt(height);
                                                let Ele = $(element).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                                $(Ele).height(height + 'px');
                                            }, 300)
                                        } else {
                                            setTimeout(function () {
                                                if ($(element).next().hasClass('bss_pb_img')) {
                                                    height = $(element).next().find('img.bss-pb-frontend').height();
                                                    height = parseInt(height) + parseInt(marginTop);
                                                    let Ele = $(element).next();
                                                    $(Ele).height(height + 'px');
                                                    element.next('.bss_pb_img').find('img').fadeIn(50);
                                                }
                                            }, 300);
                                        }
                                    } else {
                                        setTimeout(function () {
                                            if ($(element).next().hasClass('bss_pb_img')) {
                                                width = (imgBadge.length > 1) ? imgBadge[0].width() : imgBadge.width();
                                                let naturalHeight = imgBadge[0].naturalHeight;
                                                let naturalWidth = imgBadge[0].naturalWidth;
                                                height = parseInt(width / naturalWidth * naturalHeight)
                                                let Ele = $(element).next();
                                                $(Ele).height(height + 'px');
                                                element.next('.bss_pb_img').find('img').fadeIn(50);
                                            }
                                        }, 300);
                                    }
                                })

                            } else {
                                // check position & priority here
                                let newPriority = dataSelector.priority;
                                let preElementClass = element.next('.bss_pb_img').find('.bss-pb-frontend').attr('class');
                                let newElementClass = $(onlyImgTag).attr('class');
                                if (preElementClass.trim() !== newElementClass.trim()) {
                                    element.next('.bss_pb_img').prepend(onlyImgTag);
                                    element.next('.bss_pb_img').find('img').hide();
                                    element.next('.bss_pb_img').find('img').fadeIn(50);
                                } else if (parseInt(newPriority) < parseInt(firstPriority)) {
                                    element.next('.bss_pb_img').find('.bss-pb-frontend').remove();
                                    element.next('.bss_pb_img').prepend(onlyImgTag);
                                    element.next('.bss_pb_img').find('img').hide();
                                    element.next('.bss_pb_img').find('img').fadeIn(50);
                                }
                            }
                        }

                        // Apply custom selector label for collection page, search page and home page
                        if (page == 'collections' || (currentPage === "" && homePageSelector) || (currentPage === "search" && searchPageSelector)) {
                            if ($(parent).closest(pageSelector).length) {
                                if (!$(parent).closest(pageSelector).next('.bss_pb_img').length) {
                                    $(parent).closest(pageSelector).after(htmlLabel);
                                    firstPriority = dataSelector.priority;
                                    let element = $(parent).closest(pageSelector).next('.bss_pb_img');
                                    let width = 0;
                                    let height = 0;
                                    let imgBadge = $(element).find('img.bss-pb-frontend')
                                    dataRes.forEach((dataRes) => {
                                        if (checkBadgeText(dataRes)) {
                                            if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                                setTimeout(function () {
                                                    height = $(element).closest(pageSelector).find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                                    height = parseInt(height);
                                                    let Ele = $(element).closest(pageSelector).find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                                    $(Ele).height(height + 'px');
                                                }, 300)
                                            } else {
                                                setTimeout(function () {
                                                    if ($(element).length) {
                                                        height = $(element).find('img.bss-pb-frontend').height();
                                                        height = parseInt(height) + parseInt(marginTop);
                                                        $(element).height(height + 'px');
                                                    }
                                                }, 300)
                                            }
                                        } else {
                                            setTimeout(function () {
                                                if ($(element).length) {
                                                    width = imgBadge.width();
                                                    let naturalHeight = imgBadge[0].naturalHeight;
                                                    let naturalWidth = imgBadge[0].naturalWidth;
                                                    height = parseInt(width / naturalWidth * naturalHeight)
                                                    $(element).height(height + 'px');
                                                }
                                            }, 300)
                                        }
                                    })
                                } else {
                                    // check position & priority here
                                    let newPriority = dataSelector.priority;
                                    let preElementClass = $(parent).closest(pageSelector).next('.bss_pb_img').find('.bss-pb-frontend').attr('class');
                                    let newElementClass = $(onlyImgTag).attr('class');
                                    if (preElementClass.trim() !== newElementClass.trim()) {
                                        $(parent).closest(pageSelector).next('.bss_pb_img').prepend(onlyImgTag);
                                    } else if (parseInt(newPriority) < parseInt(firstPriority)) {
                                        $(parent).closest(pageSelector).next('.bss_pb_img').find('.bss-pb-frontend').remove();
                                        $(parent).closest(pageSelector).next('.bss_pb_img').prepend(onlyImgTag);
                                    }
                                }
                            } else if ($(parent).find(pageSelector).length) {
                                if (!$(parent).find(pageSelector).next('.bss_pb_img').length) {
                                    $(parent).find(pageSelector).after(htmlLabel);
                                    firstPriority = dataSelector.priority;
                                    let element = $(parent).find(pageSelector).next('.bss_pb_img');
                                    let width = 0;
                                    let height = 0;
                                    let imgBadge = $(element).find('img.bss-pb-frontend')
                                    dataRes.forEach((dataRes) => {
                                        if (checkBadgeText(dataRes)) {
                                            if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                                setTimeout(function () {
                                                    height = $(element).find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                                    height = parseInt(height);
                                                    let Ele = $(element).find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                                    $(Ele).height(height + 'px');
                                                }, 300)
                                            } else {
                                                setTimeout(function () {
                                                    let height = 0;
                                                    if ($(element).length) {
                                                        height = $(element).find('img.bss-pb-frontend').height();
                                                        height = parseInt(height) + parseInt(marginTop);
                                                        $(element).height(height + 'px');
                                                    }
                                                }, 300)
                                            }
                                        } else {
                                            setTimeout(function () {
                                                if ($(element).length) {
                                                    width = imgBadge.width();
                                                    let naturalHeight = imgBadge[0].naturalHeight;
                                                    let naturalWidth = imgBadge[0].naturalWidth;
                                                    height = parseInt(width / naturalWidth * naturalHeight)
                                                    $(element).height(height + 'px');
                                                }
                                            }, 300)
                                        }
                                    })

                                } else {
                                    // check position & priority here
                                    let newPriority = dataSelector.priority;
                                    let preElementClass = $(parent).find(pageSelector).next('.bss_pb_img').find('.bss-pb-frontend').attr('class');
                                    let newElementClass = $(onlyImgTag).attr('class');
                                    if (preElementClass.trim() !== newElementClass.trim()) {
                                        $(parent).find(pageSelector).next('.bss_pb_img').prepend(onlyImgTag);
                                    } else if (parseInt(newPriority) < parseInt(firstPriority)) {
                                        $(parent).find(pageSelector).next('.bss_pb_img').find('.bss-pb-frontend').remove();
                                        $(parent).find(pageSelector).next('.bss_pb_img').prepend(onlyImgTag);
                                    }
                                }
                            }
                        }

                        // Apply custom selector label for search page
                        //fix label compatible with Beae - Pgage builder by tungnk
                        if (
                            (page !== 'collections' && page !== 'products' && currentPage !== 'search' && currentPage !== "")
                            || (window.location.pathname.includes("/page") && $(".beae-builder") && $(".beae-builder").length)
                        ) {
                            if ($(parent).closest(otherPageSelector).length) {
                                if (!$(parent).closest(otherPageSelector).next('.bss_pb_img').length) {
                                    $(parent).closest(otherPageSelector).after(htmlLabel);
                                    firstPriority = dataSelector.priority;
                                    let element = $(parent).closest(otherPageSelector).next('.bss_pb_img');
                                    let width = 0;
                                    let height = 0;
                                    let imgBadge = $(element).find('img.bss-pb-frontend')
                                    dataRes.forEach((dataRes) => {
                                        if (checkBadgeText(dataRes)) {
                                            if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                                setTimeout(function () {
                                                    height = $(element).closest(otherPageSelector).find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                                    height = parseInt(height);
                                                    let Ele = $(element).closest(otherPageSelector).find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                                    $(Ele).height(height + 'px');
                                                }, 300)
                                            } else {
                                                setTimeout(function () {
                                                    let height = 0;
                                                    if ($(element).length) {
                                                        height = $(element).closest(otherPageSelector).find('img.bss-pb-frontend').height();
                                                        height = parseInt(height) + parseInt(marginTop);
                                                        $(element).height(height + 'px');
                                                    }
                                                }, 300)
                                            }
                                        } else {
                                            setTimeout(function () {
                                                if ($(element).length) {
                                                    width = imgBadge.width();
                                                    let naturalHeight = imgBadge[0].naturalHeight;
                                                    let naturalWidth = imgBadge[0].naturalWidth;
                                                    height = parseInt(width / naturalWidth * naturalHeight)
                                                    $(element).height(height + 'px');
                                                }
                                            }, 300)
                                        }
                                    })


                                } else {
                                    // check position & priority here
                                    let newPriority = dataSelector.priority;
                                    let preElementClass = $(parent).closest(otherPageSelector).next('.bss_pb_img').find('.bss-pb-frontend').attr('class');
                                    let newElementClass = $(onlyImgTag).attr('class');
                                    if (preElementClass.trim() !== newElementClass.trim()) {
                                        $(parent).closest(otherPageSelector).next('.bss_pb_img').prepend(onlyImgTag);
                                    } else if (parseInt(newPriority) < parseInt(firstPriority)) {
                                        $(parent).closest(otherPageSelector).next('.bss_pb_img').find('.bss-pb-frontend').remove();
                                        $(parent).closest(otherPageSelector).next('.bss_pb_img').prepend(onlyImgTag);
                                    }
                                }
                            } else if ($(parent).find(otherPageSelector).length) {
                                if (!$(parent).find(otherPageSelector).next('.bss_pb_img').length) {
                                    $(parent).find(otherPageSelector).after(htmlLabel);
                                    firstPriority = dataSelector.priority;
                                    let element = $(parent).find(otherPageSelector).next('.bss_pb_img');
                                    let width = 0;
                                    let height = 0;
                                    let imgBadge = $(element).find('img.bss-pb-frontend')
                                    dataRes.forEach((dataRes) => {
                                        if (checkBadgeText(dataRes)) {
                                            if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                                setTimeout(function () {
                                                    height = $(element).find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                                    height = parseInt(height);
                                                    let Ele = $(element).find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                                    $(Ele).height(height + 'px');
                                                }, 300)
                                            } else {
                                                setTimeout(function () {
                                                    let height = 0;
                                                    if ($(element).length) {
                                                        height = $(element).find('img.bss-pb-frontend').height();
                                                        height = parseInt(height) + parseInt(marginTop);
                                                        $(element).height(height + 'px');
                                                    }
                                                }, 300)
                                            }
                                        } else {
                                            setTimeout(function () {
                                                if ($(element).length) {
                                                    width = imgBadge.width();
                                                    let naturalHeight = imgBadge[0].naturalHeight;
                                                    let naturalWidth = imgBadge[0].naturalWidth;
                                                    height = parseInt(width / naturalWidth * naturalHeight)
                                                    $(element).height(height + 'px');
                                                }
                                            }, 300)
                                        }
                                    })
                                } else {
                                    // check position & priority here
                                    let newPriority = dataSelector.priority;
                                    let preElementClass = $(parent).find(otherPageSelector).next('.bss_pb_img').find('.bss-pb-frontend').attr('class');
                                    let newElementClass = $(onlyImgTag).attr('class');
                                    if (preElementClass.trim() !== newElementClass.trim()) {
                                        $(parent).find(otherPageSelector).next('.bss_pb_img').prepend(onlyImgTag);
                                    } else if (parseInt(newPriority) < parseInt(firstPriority)) {
                                        $(parent).find(otherPageSelector).next('.bss_pb_img').find('.bss-pb-frontend').remove();
                                        $(parent).find(otherPageSelector).next('.bss_pb_img').prepend(onlyImgTag);
                                    }
                                }
                            }
                        }
                        //
                    }

                });
            }
        });
    }
    BSS_PL.initForBadgeProductName = function ($, BSS_PL, dataRes, parents, item, prodData, foundFirstImage, page, firstParent) {
        let appended = false;
        $.each(parents, function (index, parent) {
            if (BSS_PL.storeId == 21614 && $(parent).hasClass('sub-nav-item')) {
                return;
            }
            let marginTop = BSS_PL.getMaxValueMarginTop(dataRes);
            let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
            let htmlLabel = '',
                priceEl = '',
                mainPrice = '',
                htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
            if (htmlList.length && !foundFirstImage) {
                htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                htmlLabel += htmlList.join('');
                htmlLabel += '</div>';

                // Find elemet for common price section
                priceEl = findPriceElementForBadgeName($, BSS_PL, parent, page);
                // Find elemet for main price section product page
                mainPrice = findMainPriceForBadgeName($, BSS_PL, parent, page);

                /** FIX SUPPORT BY STORE ID */
                // eslint-disable-next-line
                if (typeof bssFixSupportBadgeProductName == 'function') {
                    // eslint-disable-next-line
                    appended = bssFixSupportBadgeProductName($, parent, page, priceEl, mainPrice, appended, htmlLabel)
                }
                /** END FIX SUPPORT BY STORE ID */

                // Init badge for MainPrice & fix label compatible with Beae - Pgage builder by tungnk
                if (mainPrice.length && (page == 'products' || (window.location.pathname.includes("/page") && $(".beae-builder") && $(".beae-builder").length)) || (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1 && page == '' && $(mainPrice).closest('.collage-card').length)) {
                    if (!mainPrice.prev('.bss_pb_img').length) {
                        if (BSS_PL.storeId == 2907) {
                            $(mainPrice).append(htmlLabel);
                            appended = true;
                            setTimeout(function () {
                                let Ele = $(mainPrice).parent().find('.bss_pb_img');
                                $(Ele).height('0 px !important');
                            }, 500)
                        }
                        else {
                            $(mainPrice).before(htmlLabel);
                            appended = true;
                        }
                        let width = 0;
                        let height = 0;
                        let imgBadge = $(mainPrice).prev().find('img.bss-pb-frontend').first();
                        dataRes.forEach((dataRes) => {
                            if (checkBadgeText(dataRes)) {
                                if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                    setTimeout(function () {
                                        height = $(mainPrice).prev().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                        height = parseInt(height);
                                        let Ele = $(mainPrice).prev().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                } else {
                                    setTimeout(function () {
                                        height = $(parent).parent().find('.bss_pb_img img.bss-pb-frontend').first().height();
                                        height = parseInt(height) + parseInt(marginTop);
                                        let Ele = $(mainPrice).parent().find('.bss_pb_img');
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                }
                            } else {
                                setTimeout(function () {
                                    if (!imgBadge.length) return;
                                    width = imgBadge.width();
                                    let naturalHeight = imgBadge[0].naturalHeight;
                                    let naturalWidth = imgBadge[0].naturalWidth;
                                    height = parseInt(width / naturalWidth * naturalHeight)
                                    let Ele = $(mainPrice).prev('.bss_pb_img').first();
                                    $(Ele).height(height + 'px');
                                }, 300)
                            }
                        })
                    }
                }

                // Init badge for ElementPrice
                if (priceEl && priceEl.length) {
                    if (!priceEl.prev('.bss_pb_img').length) {
                        if (window.location.pathname == '/search' && ![21614, 33323, 33833].includes(BSS_PL.storeId)) {
                            $(priceEl).before(htmlLabel);
                            if ($(priceEl).next().next().hasClass('bss_pb_img')) {
                                $(priceEl).next().next().remove();
                            }
                        }
                        else {
                            let defaultAppend = true
                            /** FIX SUPPORT BY STORE ID */
                            // eslint-disable-next-line
                            if (typeof bssFixSupportInitBadgeElePrice == 'function') {
                                // eslint-disable-next-line
                                defaultAppend = bssFixSupportInitBadgeElePrice($, page, priceEl, mainPrice, htmlLabel, defaultAppend)
                            }
                            /** END FIX SUPPORT BY STORE ID */
                            if (defaultAppend) {
                                $(priceEl).before(htmlLabel)
                            }
                        }
                        appended = true;
                        let width = 0;
                        let height = 0;
                        let Ele = 0;
                        let imgBadge = $(priceEl).prev().find('img.bss-pb-frontend');
                        dataRes.forEach((dataRes) => {
                            if (checkBadgeText(dataRes)) {
                                if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                    setTimeout(function () {
                                        height = $(priceEl).prev().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                        height = parseInt(height);
                                        Ele = $(priceEl).prev().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                } else {
                                    setTimeout(function () {
                                        if ($(priceEl).prev().hasClass('bss_pb_img')) {
                                            if ($(priceEl).prev().find('img.bss-pb-frontend').length) {
                                                height = $(priceEl).prev().find('img.bss-pb-frontend').height();
                                                height = parseInt(height) + parseInt(marginTop);
                                                Ele = $(priceEl).prev();
                                                $(Ele).height(height + 'px');
                                            } else {
                                                height = $(priceEl).prev().find('.bss-pb-frontend.bss_pl_label_text').height();
                                                height = parseInt(height) + parseInt(marginTop);
                                                Ele = $(priceEl).prev();
                                                $(Ele).height(height + 'px');
                                            }
                                        }
                                    }, 300)
                                }
                            } else {
                                setTimeout(function () {
                                    if (Shopify.theme.name == "Refresh") {
                                        imgBadge = $(priceEl).next().find('img.bss-pb-frontend');
                                    }
                                    if ($(priceEl).prev().hasClass('bss_pb_img') || $(priceEl).next().hasClass('bss_pb_img')) {
                                        if (imgBadge.length) {
                                            width = imgBadge.width();
                                            let naturalHeight = imgBadge[0].naturalHeight;
                                            let naturalWidth = imgBadge[0].naturalWidth;
                                            height = parseInt(width / naturalWidth * naturalHeight)
                                            Ele = $(priceEl).prev();
                                            if (Shopify.theme.name == "Refresh") {
                                                Ele = $(priceEl).next();
                                            }
                                            $(Ele).height(height + 'px');
                                        } else {
                                            height = $(priceEl).prev().find('.bss-pb-frontend.bss_pl_label_text').height();
                                            height = parseInt(height) + parseInt(marginTop);
                                            Ele = $(priceEl).prev();
                                            $(Ele).height(height + 'px');
                                        }
                                    }
                                }, 300)
                            }
                        })
                    }
                }
                // For search page
                // Find elemet for product title block
                let productTitle = $(parent).closest('.list-view-item').find('div[class*="item__title"]').first();
                if (productTitle.length) {
                    if (!productTitle.closest('div').find('.bss_pb_img').length) {
                        $(productTitle).find('div[class*="title"]').after(htmlLabel);
                        appended = true;
                        let height = 0;
                        let width = 0;
                        let imgBadge = $(productTitle).closest('div').find('.bss_pb_img img').first();
                        dataRes.forEach((dataRes) => {
                            if (checkBadgeText(dataRes)) {
                                if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                    setTimeout(function () {
                                        height = $(productTitle).prev().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                        height = parseInt(height);
                                        let Ele = $(productTitle).prev().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                } else {
                                    setTimeout(function () {
                                        height = $(productTitle).parent().find('.bss_pb_img img.bss-pb-frontend').first().height();
                                        height = parseInt(height) + parseInt(marginTop);
                                        let Ele = $(productTitle).parent().find('.bss_pb_img');
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                }
                            } else {
                                setTimeout(function () {
                                    if (!imgBadge.length) return;
                                    width = imgBadge.width();
                                    let naturalHeight = imgBadge[0].naturalHeight;
                                    let naturalWidth = imgBadge[0].naturalWidth;
                                    height = parseInt(width / naturalWidth * naturalHeight)
                                    let Ele = $(productTitle).parent().find('.bss_pb_img');
                                    $(Ele).height(height + 'px');
                                }, 300)
                            }
                        })
                    }
                }
            }
        });

        if (!appended) {
            // if not insert then check and insert to parent
            var isAllowInsert = !$(firstParent).hasClass('swatchProductColor') && !$(firstParent).hasClass('hero-content') && !$(firstParent).hasClass('critical-clear');
            if (isAllowInsert) {
                $.each(parents, function (index, parent) {
                    if (BSS_PL.storeId == 21614 && $(parent).hasClass('sub-nav-item')) {
                        return;
                    }
                    var htmlLabel = '',
                        htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
                    let className = $(parent).attr('class');
                    let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
                    htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                    htmlLabel += htmlList.join('');
                    htmlLabel += '</div>';
                    if (className && className.includes('price')) {
                        //fix for asianoeki by XuTho
                        if (BSS_PL.storeId == 21614) {
                            appended = true;
                        } else {
                            $(parent).after(htmlLabel);
                            appended = true;
                        }
                    } else if (className && className.includes('name')) {
                        if (BSS_PL.storeId == 21614) {
                            appended = true;
                        } else {
                            $(parent).after(htmlLabel);
                            appended = true;
                        }
                    }
                });
                if (!appended) {
                    if (BSS_PL.storeId == 21614 && $(firstParent).hasClass('sub-nav-item')) {
                        return;
                    }
                    let htmlLabel = '',
                        htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, firstParent);
                    let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
                    if (htmlList.length) {
                        htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px">';
                        htmlLabel += htmlList.join('');
                        htmlLabel += '</div>';
                        // fix for thelordofthemagic by ThaBi
                        if ((BSS_PL.storeId == 9006 && page == 'products' && $(parent).attr('data-pf-type') == 'Column') || (BSS_PL.storeId == 21614 && (window.location.pathname == "/search") || $(firstParent).parent().find('.bss_pb_img').length)) {
                            // do nothing
                        } else {
                            if (!(Shopify && Shopify.theme && Shopify.theme.name && (Shopify.theme.name.indexOf("Dawn") !== -1))) {
                                $(firstParent).after(htmlLabel);
                            }
                        }
                    }

                }
            }
        }


        if (page == "products" && Shopify && Shopify.theme && Shopify.theme.name &&
            (Shopify.theme.name.indexOf("Refresh") !== -1 ||
                Shopify.theme.name.indexOf("Colorblock") !== -1 ||
                Shopify.theme.name.indexOf("Sense") !== -1 ||
                Shopify.theme.name.indexOf("Taste") !== -1 ||
                Shopify.theme.name.indexOf("Studio") !== -1 ||
                Shopify.theme.name.indexOf("Crave") !== -1 ||
                Shopify.theme.name.indexOf("Ride") !== -1 ||
                Shopify.theme.name.indexOf("Origin") !== -1 ||
                Shopify.theme.name.indexOf("Publisher") !== -1 ||
                Shopify.theme.name.indexOf("Craft") !== -1
            )) {
            if ($('.product__info-container .no-js-hidden .bss_pb_img').length) {
                $('.product__info-container .no-js-hidden .bss_pb_img').remove()
            }
        }
        if (page == "products" && BSS_PL.storeId == 24638) {
            if ($(".product-main-slide .bss_pb_img").length) {
                $(".product-main-slide .bss_pb_img").remove()
            }
        }
        if (page == "products" && BSS_PL.storeId == 32515) {
            if ($(".product-form__input .bss_pb_img").length || $(".product__media-item .bss_pb_img").length) {
                $(".product__media-item .bss_pb_img").remove()
                $(".product-form__input .bss_pb_img").remove()
            }
        }
    }
    BSS_PL.initForBadgePrice = function ($, BSS_PL, dataRes, parents, item, prodData, foundFirstImage, page, firstParent) {
        let appended = false;
        $.each(parents, function (index, parent) {

            let marginTop = BSS_PL.getMaxValueMarginTop(dataRes);
            let htmlLabel = '',
                priceEl = '',
                mainPrice = '',
                htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
            let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
            if (htmlList.length && !foundFirstImage) {
                htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px">';
                htmlLabel += htmlList.join('');
                htmlLabel += '</div>';

                //Fix gonatural by thienpk
                if (BSS_PL.storeId == 13557 && window.location.pathname == '/search') {
                    htmlLabel = htmlLabel.replace('margin-bottom: ' + marginBottom + 'px', 'margin-bottom: ' + (+(marginBottom) - 33) + 'px');
                }
                // Find elemet for common price section
                priceEl = findPriceElementForBadgePrice($, BSS_PL, parent, page);

                // if out of stock then not append
                if ($(parent).hasClass('grid__item') && $(parent).find('.product-card .product-card__availability').length) {
                    appended = true;
                }
                // Find elemet for main price section product page
                mainPrice = findMainPriceForBadgePrice($, BSS_PL, parent, page);
                if (priceEl && priceEl.length && !priceEl.next('.bss_pb_img').length) {
                    if (BSS_PL.storeId == 9708 && (page == 'collections' || window.location.pathname == '/search' || page == '')) {
                        $(priceEl).append(htmlLabel);
                        appended = true;
                    } else {
                        $(priceEl).after(htmlLabel);
                        appended = true;
                    }
                    let width = 0;
                    let height = 0;
                    let Ele = 0;
                    let imgBadge = $(priceEl).next().find('img.bss-pb-frontend')
                    dataRes.forEach((dataRes) => {
                        if (checkBadgeText(dataRes)) {
                            if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                setTimeout(function () {
                                    height = $(priceEl).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                    height = parseInt(height);
                                    Ele = $(priceEl).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                    $(Ele).height(height + 'px');
                                }, 300)
                            } else {
                                setTimeout(function () {
                                    if ($(priceEl).prev().hasClass('bss_pb_img')) {
                                        height = $(priceEl).prev().find('img.bss-pb-frontend').height();
                                        height = parseInt(height) + parseInt(marginTop);
                                        Ele = $(priceEl).next();
                                        $(Ele).height(height + 'px');
                                    }
                                }, 300)
                            }
                        } else {
                            setTimeout(function () {
                                if ($(priceEl).next().hasClass('bss_pb_img')) {
                                    if (!imgBadge.length) return;
                                    width = imgBadge.width();
                                    let naturalHeight = imgBadge[0].naturalHeight;
                                    let naturalWidth = imgBadge[0].naturalWidth;
                                    height = parseInt(width / naturalWidth * naturalHeight)
                                    Ele = $(priceEl).next();
                                    $(Ele).height(height + 'px');
                                }
                            }, 300)
                        }
                    })
                }

                else if (mainPrice.length && (page === 'products' || (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1 && page == '' && $(mainPrice).closest('.product__info-wrapper').length))) {
                    if (!mainPrice.next('.bss_pb_img').length) {
                        // fix for freddiestreasures by ThaBi
                        if (BSS_PL.storeId == 12582) {
                            if (page == 'products' && (mainPrice.hasClass('.price--highlight') || mainPrice.hasClass('.price--compare'))) {
                                appended = true
                            }
                        } else {
                            $(mainPrice).after(htmlLabel);
                            appended = true;
                        }
                        let width = 0;
                        let height = 0;
                        let imgBadge = $(mainPrice).next().find('img.bss-pb-frontend').first()
                        dataRes.forEach((dataRes) => {
                            if (checkBadgeText(dataRes)) {
                                if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                    setTimeout(function () {
                                        height = $(mainPrice).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                        height = parseInt(height);
                                        let Ele = $(mainPrice).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                } else {
                                    setTimeout(function () {
                                        height = $(parent).parent().find('.bss_pb_img img.bss-pb-frontend').first().height();
                                        height = parseInt(height) + parseInt(marginTop);
                                        let Ele = $(mainPrice).next().first();
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                }
                            } else {
                                setTimeout(function () {
                                    width = imgBadge.width();
                                    let naturalHeight = imgBadge[0].naturalHeight;
                                    let naturalWidth = imgBadge[0].naturalWidth;
                                    height = parseInt(width / naturalWidth * naturalHeight)
                                    let Ele = $(mainPrice).next().first();
                                    $(Ele).height(height + 'px');
                                }, 300)
                            }
                        })
                    }
                }
                // For search page
                // Find elemet for product title block
                let productTitle = $(parent).closest('.list-view-item').find('div[class*="item__title"]').first();
                if (productTitle.length) {
                    if (BSS_PL.storeId == 14855 && window.location.pathname == "/search") {
                        // fix https://freelandandthatcher.com/ by Thongchu
                    }
                    else if (!productTitle.closest('div').find('.bss_pb_img').length) {
                        $(productTitle).find('div[class*="title"]').after(htmlLabel);
                        appended = true;
                        let width = 0;
                        let height = 0;
                        let imgBadge = $(productTitle).parent().find('.bss_pb_img img').first()
                        dataRes.forEach((dataRes) => {
                            if (checkBadgeText(dataRes)) {
                                if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                    setTimeout(function () {
                                        height = $(productTitle).prev().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                        height = parseInt(height);
                                        let Ele = $(productTitle).prev().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                } else {
                                    setTimeout(function () {
                                        height = $(productTitle).closest('div').find('.bss_pb_img img').first().height();
                                        height = parseInt(height) + parseInt(marginTop);
                                        let Ele = $(productTitle).parent().find('.bss_pb_img');
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                }
                            } else {
                                setTimeout(function () {
                                    if (!imgBadge.length) return;
                                    width = imgBadge.width();
                                    let naturalHeight = imgBadge[0].naturalHeight;
                                    let naturalWidth = imgBadge[0].naturalWidth;
                                    height = parseInt(width / naturalWidth * naturalHeight)
                                    let Ele = $(productTitle).parent().find('.bss_pb_img').first();
                                    $(Ele).height(height + 'px');
                                }, 300)
                            }
                        })
                    }
                }
            }
        });

        if (!appended) {
            // if not insert then check and insert to parent
            var isAllowInsert = !$(firstParent).hasClass('swatchProductColor') && !$(firstParent).hasClass('hero-content') && !$(firstParent).hasClass('critical-clear');
            if (isAllowInsert) {
                if (BSS_PL.storeId == 5196) {
                    // fix for besserernten by ThaBi
                } else {
                    $.each(parents, function (index, parent) {
                        var htmlLabel = '',
                            htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
                        let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
                        let className = $(parent).attr('class');
                        htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                        htmlLabel += htmlList.join('');
                        htmlLabel += '</div>';
                        if (className && className.includes('price')) {
                            $(parent).after(htmlLabel);
                            appended = true;
                        } else if (className && className.includes('name')) {
                            $(parent).after(htmlLabel);
                            appended = true;
                        }
                    });

                    if (!appended) {
                        let htmlLabel = '',
                            htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, firstParent);
                        let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
                        if (htmlList.length) {
                            htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                            htmlLabel += htmlList.join('');
                            htmlLabel += '</div>';
                            if (!(Shopify && Shopify.theme && Shopify.theme.name && (Shopify.theme.name.indexOf("Dawn") !== -1))) {
                                $(firstParent).after(htmlLabel);
                            }
                        }

                    }
                }

            }
        }

        if (page == "products" && Shopify && Shopify.theme && Shopify.theme.name &&
            (Shopify.theme.name.indexOf("Refresh") !== -1 ||
                Shopify.theme.name.indexOf("Colorblock") !== -1 ||
                Shopify.theme.name.indexOf("Sense") !== -1 ||
                Shopify.theme.name.indexOf("Taste") !== -1 ||
                Shopify.theme.name.indexOf("Studio") !== -1 ||
                Shopify.theme.name.indexOf("Crave") !== -1 ||
                Shopify.theme.name.indexOf("Ride") !== -1 ||
                Shopify.theme.name.indexOf("Origin") !== -1 ||
                Shopify.theme.name.indexOf("Publisher") !== -1 ||
                Shopify.theme.name.indexOf("Craft") !== -1
            )) {
            if ($('.product__info-container .no-js-hidden .bss_pb_img').length) {
                $('.product__info-container .no-js-hidden .bss_pb_img').remove()
            }
        }
        if (BSS_PL.storeId == 30494 && $(".SidebarMenu__Nav .bss_pb_img").length) {
            $(".SidebarMenu__Nav .bss_pb_img").remove()
        }
        if (BSS_PL.storeId == 6681 && $(".mobile-menu__nav .bss_pb_img").length && $(".price-list .bss_pb_img")) {
            $(".mobile-menu__nav .bss_pb_img").remove()
            $(".price-list .bss_pb_img").remove()
        }
        if (BSS_PL.storeId == 32515 && ($(".quantity .bss_pb_img").length || $(".product__modal-opener .bss_pb_img").length || $(".card-information__wrapper .bss_pb_img").length || $(".product__media-gallery .bss_pb_img").length)) {
            $(".quantity .bss_pb_img").remove()
            $(".product__media-item .bss_pb_img").remove()
            $(".card-information__wrapper .bss_pb_img").remove()
            $(".product__media-gallery .bss_pb_img").remove()
        }
    }
    BSS_PL.initForBadgeProductImage = function ($, BSS_PL, dataRes, parents, item, prodData, foundFirstImage, page, firstParent) {
        let appended = false;
        $.each(parents, function (index, parent) {
            let marginTop = BSS_PL.getMaxValueMarginTop(dataRes);
            let htmlLabel = '',
                htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
            let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
            if (htmlList.length && !foundFirstImage) {
                htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                htmlLabel += htmlList.join('');
                htmlLabel += '</div>';
                appended = fixBugForBadgeImage($, BSS_PL, parent, page, htmlLabel);

            }
            // If appended, set height for badge block
            if (appended) {
                let width = 0;
                let height = 0;
                let imgBadge = $(parent).parent().find('.bss_pb_img img.bss-pb-frontend').first();
                let Ele = $(parent).find('.bss_pb_img').first();
                dataRes.forEach((dataRes) => {
                    if (checkBadgeText(dataRes)) {
                        if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                            setTimeout(function () {
                                height = $(parent).parent().parent().find(`.bss_pb_img div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                if (height == 0 || height == undefined) {
                                    height = $(parent).closest(".card-wrapper ").find(`.card__inner ~ .bss_pb_img div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                }
                                height = parseInt(height);
                                if(page == "products"){
                                    Ele = $(parent).parent().parent().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text, div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`)
                                }else if($(parent).closest('.featured-product').length){
                                    Ele= $(parent).closest('.featured-product').find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text, div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`)
                                }
                                if($(parent).closest(".card-wrapper").length){
                                   Ele = $(parent).closest(".card-wrapper").find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text, div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`)
                                }
                                if (!Ele.length) {
                                    Ele = $(parent).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text, div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`);
                                }
                                $(Ele).height(height + 'px');
                            }, 300)
                        } else {
                            setTimeout(function () {
                                height = $(parent).parent().find('.bss_pb_img img.bss-pb-frontend').first().height();
                                height = parseInt(height) + parseInt(marginTop);
                                Ele = $(parent).find('.bss_pb_img').first();
                                if (!Ele.length) {
                                    Ele = $(parent).next('.bss_pb_img');
                                }
                                $(Ele).height(height + 'px');
                            }, 300)
                        }
                    } else {
                        if (Shopify.theme.name == 'Dawn' || Shopify.theme.name == 'Ride' || Shopify.theme.name == 'Refresh' || Shopify.theme.name == 'Craft' || Shopify.theme.name == 'Sense'
                            || Shopify.theme.name == 'Taste' || Shopify.theme.name == 'Origin' || Shopify.theme.name == 'Studio' || Shopify.theme.name == 'Crave'
                            || Shopify.theme.name == 'Publisher' || Shopify.theme.name == 'Colorblock' || !imgBadge.length) {
                            imgBadge = (page == "products") ? $(parent).parent().parent().find('.bss_pb_img .bss-pb-frontend') : $(parent).closest(".card-wrapper").find('.bss_pb_img .bss-pb-frontend')
                        }
                        else if (Shopify.theme.name == 'Debut') {
                            imgBadge = (page == "products" || page == "") ? $(parent).parent().parent().find('.bss_pb_img .bss-pb-frontend') : $(parent).find('.bss_pb_img .bss-pb-frontend').first()
                        }
                        setTimeout(function () {
                            if (!imgBadge.length) return;
                            width = imgBadge.width();
                            let naturalHeight = imgBadge[0].naturalHeight;
                            let naturalWidth = imgBadge[0].naturalWidth;
                            height = parseInt(width / naturalWidth * naturalHeight);
                            if (Shopify.theme.name == 'Dawn' || Shopify.theme.name == 'Ride' || Shopify.theme.name == 'Refresh' || Shopify.theme.name == 'Craft' || Shopify.theme.name == 'Sense'
                                || Shopify.theme.name == 'Taste' || Shopify.theme.name == 'Origin' || Shopify.theme.name == 'Studio' || Shopify.theme.name == 'Crave'
                                || Shopify.theme.name == 'Publisher' || Shopify.theme.name == 'Colorblock' || !Ele.length) {
                                Ele = (page == "products") ? $(parent).parent().parent().find('.bss_pb_img') : Ele = $(parent).closest(".card-wrapper").find('.bss_pb_img')
                            }
                            else if (Shopify.theme.name == 'Debut') {
                                Ele = (page == "products" || page == "") ? $(parent).parent().parent().find('.bss_pb_img') : Ele = $(parent).find('.bss_pb_img').first()
                            }
                            $(Ele).height(height + 'px');
                        }, 300)
                    }
                })
            }
        });
        if (!appended) {
            // if not insert then check and insert to parent
            var isAllowInsert = !$(firstParent).hasClass('swatchProductColor') && !$(firstParent).hasClass('hero-content');
            if (isAllowInsert) {
                $.each(parents, function (index, parent) {
                    var htmlLabel = '',
                        htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
                    let className = $(parent).attr('class');
                    let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
                    htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                    htmlLabel += htmlList.join('');
                    htmlLabel += '</div>';
                    if (className && className.includes('image') &&  BSS_PL.storeId != 22707) {
                        //fix for asianoeki by XuTho
                        if (BSS_PL.storeId == 21614 && ($(parent).prev('.bss_pb_img').length || $(parent).next('.bss_pb_img').length || $(parent).hasClass('cart-summary-item__image'))) {
                            appended = true;
                        } else if(Shopify.theme.name.indexOf("Sense") !== -1){
                            appended = true;
                        } else if (Shopify.theme.name.includes("Craft") !== -1 && ($(parent).prev('.bss_pb_img').length || $(parent).next('.bss_pb_img').length)) {
                            appended = true;
                        } else {
                            $(parent).after(htmlLabel);
                            appended = true;
                        }
                    } else if (className && className.includes('name')) {
                        if (BSS_PL.storeId == 21614 && ($(parent).prev('.bss_pb_img').length || $(parent).next('.bss_pb_img').length || $(parent).hasClass('cart-summary-item__image'))) {
                            appended = true;
                        } else if ((Shopify.theme.name.indexOf("Sense") !== -1 || Shopify.theme.name.includes("Craft") !== -1) && ($(parent).prev('.bss_pb_img').length || $(parent).next('.bss_pb_img').length)) {
                            appended = true;
                        } else {
                            $(parent).before(htmlLabel);
                            appended = true;
                        }
                    } else if (className && className.includes('price')) {
                        // fix bug for asianoeki.myshopify.com by  XuTho
                        if (BSS_PL.storeId == 21614 && ($(parent).prev('.bss_pb_img').length || $(parent).next('.bss_pb_img').length || $(parent).hasClass('cart-summary-item__image'))) {
                            appended = true;
                        } else if ((Shopify.theme.name.indexOf("Sense") !== -1 || Shopify.theme.name.includes("Craft") !== -1) && ($(parent).prev('.bss_pb_img').length || $(parent).next('.bss_pb_img').length)) {
                            appended = true;
                        } else {
                            $(parent).before(htmlLabel);
                            appended = true;
                        }
                    }
                });
                if (!appended) {
                    let htmlLabel = '',
                        htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, firstParent);
                    let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
                    if (htmlList.length) {
                        htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                        htmlLabel += htmlList.join('');
                        htmlLabel += '</div>';
                        // fix for thelordofthemagic by ThaBi
                        if (BSS_PL.storeId == 9006 && page == 'products') {
                            if ($(firstParent).attr('data-pf-type') == 'MasterImage') {
                                return;
                            }
                            if ($(firstParent).attr('data-pf-type') == 'Column') {
                                return;
                            }
                        }
                        // fix for kameraz by ThaBi
                        else if (BSS_PL.storeId == 16487 && page == 'products') {
                            if ($(firstParent).hasClass('product-item') && $(firstParent).parent().hasClass('flickity-slider')) {
                                return;
                            }
                        }
                        // Fix for vxaparts by LocNT
                        else if (BSS_PL.storeId == 22481 && page == 'products') {
                            return;
                        }
                        // fix for victoriabeckham by DuBD
                        else if ([34036, 22707, 24183].includes(BSS_PL.storeId) && page == 'collections') {
                            return;
                        }
                        //fix badge duplicate on product not image by NhatHN
                        else if ($(firstParent).hasClass('card__heading')) {
                            return;
                        }
                        //fix not show badge on product not image by NhatHN
                        else if (!$(firstParent).parent().parent().find("img").length) {
                            return;
                        }
                        else if (!$(firstParent).next('.bss_pb_img').length && !$(firstParent).prev('.bss_pb_img').length) {
                            $(firstParent).after(htmlLabel);
                        }
                    }
                }
            }
        }
        //products have two image -> remove badge
        if ($('div[data-thumbnail-slider]').length) {
            if ($('.product-single__media-wrapper .bss_pb_img').length) {
                $('.product-single__media-wrapper .bss_pb_img').remove()
            }
        }
        // XuTho, LinhDT fix code compatible theme dawn 2.0
        if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.includes("Dawn")) {
            if (page == "products" && $('.product__modal-opener.product__modal-opener--image .bss_pb_img').length) {
                $('.product__modal-opener.product__modal-opener--image .bss_pb_img').remove()
            }
            if ($('.card-wrapper .card--product .bss_pb_img').length) {
                $('.card-wrapper .card--product .bss_pb_img').remove()
            }
        }
    }
    BSS_PL.initForBadgeAddToCartBtn = function ($, BSS_PL, dataRes, parents, item, prodData, foundFirstImage, page, firstParent) {
        let appended = false;
        $.each(parents, function (index, parent) {

            let marginTop = BSS_PL.getMaxValueMarginTop(dataRes);
            let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
            let htmlLabel = '',
                addToCartEl = '',
                addToCartMain = '',
                htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
            if (htmlList.length && !foundFirstImage) {
                htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px">';
                htmlLabel += htmlList.join('');
                htmlLabel += '</div>';

                // Find elemet for main add to cart button section in product page
                addToCartMain = findMainClassForBadgeAddToCart($, BSS_PL, parent, page);

                // Find elemet for common add to cart button section
                addToCartEl = findElementClassForBadgeAddToCart($, BSS_PL, parent, page);

                if (addToCartEl.length && !appended) {
                    if (!addToCartEl.next('.bss_pb_img').length) {
                        $(addToCartEl).after(htmlLabel);
                        appended = true;

                        let width = 0;
                        let height = 0;
                        let Ele = 0;
                        let imgBadge = $(addToCartEl).next().find('img.bss-pb-frontend')
                        dataRes.forEach((dataRes) => {
                            if (checkBadgeText(dataRes)) {
                                if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                    setTimeout(function () {
                                        height = $(addToCartEl).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                        height = parseInt(height);
                                        Ele = $(addToCartEl).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                } else {
                                    setTimeout(function () {
                                        if ($(addToCartEl).next().hasClass('bss_pb_img')) {
                                            height = $(addToCartEl).next().find('img.bss-pb-frontend').height();
                                            height = parseInt(height) + parseInt(marginTop);
                                            Ele = $(addToCartEl).next();
                                            $(Ele).height(height + 'px');
                                        }
                                    }, 300)
                                }
                            } else {
                                setTimeout(function () {
                                    if ($(addToCartEl).next().hasClass('bss_pb_img')) {
                                        if (!imgBadge.length) return;
                                        width = imgBadge.width();
                                        let naturalHeight = imgBadge[0].naturalHeight;
                                        let naturalWidth = imgBadge[0].naturalWidth;
                                        height = parseInt(width / naturalWidth * naturalHeight)
                                        Ele = $(addToCartEl).next();
                                        $(Ele).height(height + 'px');
                                    }
                                }, 300)
                            }
                        })

                    }
                }

                if (addToCartMain.length || (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1 && page == '' && $(addToCartMain).closest('.product__info-wrapper').length)) {
                    if (!addToCartMain.next('.bss_pb_img').length) {
                        $(addToCartMain).after(htmlLabel);
                        appended = true;

                        let width = 0;
                        let height = 0;
                        let Ele = 0;
                        let imgBadge = $(addToCartMain).next().find('img.bss-pb-frontend')
                        dataRes.forEach((dataRes) => {
                            if (checkBadgeText(dataRes)) {
                                if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                    setTimeout(function () {
                                        height = $(addToCartMain).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                        height = parseInt(height);
                                        Ele = $(addToCartMain).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                } else {
                                    setTimeout(function () {
                                        if ($(addToCartMain).next().hasClass('bss_pb_img')) {
                                            height = $(addToCartMain).next().find('.bss_pb_img img').first().height();
                                            height = parseInt(height) + parseInt(marginTop);
                                            Ele = $(addToCartMain).next().find('.bss_pb_img');
                                            $(Ele).height(height + 'px');
                                        }
                                    }, 300)
                                }
                            } else {
                                setTimeout(function () {
                                    if ($(addToCartMain).next().hasClass('bss_pb_img')) {
                                        if (!imgBadge.length) return;
                                        width = imgBadge.width();
                                        let naturalHeight = imgBadge[0].naturalHeight;
                                        let naturalWidth = imgBadge[0].naturalWidth;
                                        height = parseInt(width / naturalWidth * naturalHeight)
                                        Ele = $(addToCartMain).next();
                                        $(Ele).height(height + 'px');
                                    }
                                }, 300)
                            }
                        })
                    }
                }
            }
        });

        if (!appended) {
            // if not insert then check and insert to parent
            var isAllowInsert = !$(firstParent).hasClass('swatchProductColor') && !$(firstParent).hasClass('hero-content') && !$(firstParent).hasClass('critical-clear');
            if (isAllowInsert) {
                $.each(parents, function (index, parent) {
                    var htmlLabel = '',
                        htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
                    let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
                    let className = $(parent).attr('class');
                    htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                    htmlLabel += htmlList.join('');
                    htmlLabel += '</div>';
                    if (className && className.includes('submit')) {
                        $(parent).after(htmlLabel);
                        appended = true;
                    }
                });

                if (!appended) {
                    let htmlLabel = '',
                        htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, firstParent);
                    let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
                    if (htmlList.length) {
                        htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                        htmlLabel += htmlList.join('');
                        htmlLabel += '</div>';
                        if (!(Shopify && Shopify.theme && Shopify.theme.name && (Shopify.theme.name.indexOf("Dawn") !== -1)) && BSS_PL.storeId !== 32515) {
                            $(firstParent).after(htmlLabel);
                        }
                    }

                }
            }
        }
    }
    BSS_PL.initForBadgeQuantityBox = function ($, BSS_PL, dataRes, parents, item, prodData, foundFirstImage, page, firstParent) {
        let appended = false;
        $.each(parents, function (index, parent) {

            let marginTop = BSS_PL.getMaxValueMarginTop(dataRes);
            let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
            let htmlLabel = '',
                quantityBoxEl = '',
                quantityBoxMain = '',
                htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
            if (htmlList.length && !foundFirstImage) {
                htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px">';
                htmlLabel += htmlList.join('');
                htmlLabel += '</div>';

                // Find elemet for main add to cart button section in product page
                quantityBoxMain = findMainClassForBadgeQtyBox($, BSS_PL, parent, page);

                // Find elemet for common add to cart button section
                quantityBoxEl = findElementClassForBadgeQtyBox($, BSS_PL, parent, page);

                if (quantityBoxEl.length && !appended) {
                    if (!quantityBoxEl.next('.bss_pb_img').length) {
                        $(quantityBoxEl).after(htmlLabel);
                        appended = true;

                        let width = 0;
                        let height = 0;
                        let Ele = 0;
                        let imgBadge = $(quantityBoxEl).next().find('img.bss-pb-frontend')
                        dataRes.forEach((dataRes) => {
                            if (checkBadgeText(dataRes)) {
                                if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                    setTimeout(function () {
                                        height = $(quantityBoxEl).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                        height = parseInt(height);
                                        Ele = $(quantityBoxEl).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                } else {
                                    setTimeout(function () {
                                        if ($(quantityBoxEl).next().hasClass('bss_pb_img')) {
                                            height = $(quantityBoxEl).next().find('img.bss-pb-frontend').height();
                                            height = parseInt(height) + parseInt(marginTop);
                                            Ele = $(quantityBoxEl).next();
                                            $(Ele).height(height + 'px');
                                        }
                                    }, 300)
                                }
                            } else {
                                setTimeout(function () {
                                    if ($(quantityBoxEl).next().hasClass('bss_pb_img')) {
                                        if (!imgBadge.length) return;
                                        width = imgBadge.width();
                                        let naturalHeight = imgBadge[0].naturalHeight;
                                        let naturalWidth = imgBadge[0].naturalWidth;
                                        height = parseInt(width / naturalWidth * naturalHeight)
                                        Ele = $(quantityBoxEl).next();
                                        $(Ele).height(height + 'px');
                                    }
                                }, 300)
                            }
                        })
                    }
                }

                if (quantityBoxMain.length || (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1 && page == '' && $(quantityBoxMain).closest('.product__info-wrapper').length)) {
                    if (!quantityBoxMain.next('.bss_pb_img').length) {
                        $(quantityBoxMain).after(htmlLabel);
                        appended = true;
                        let width = 0;
                        let height = 0;
                        let Ele = 0;
                        let imgBadge = $(quantityBoxMain).next().find('img.bss-pb-frontend')
                        dataRes.forEach((dataRes) => {
                            if (checkBadgeText(dataRes)) {
                                if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                    setTimeout(function () {
                                        height = $(quantityBoxMain).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                        height = parseInt(height);
                                        Ele = $(quantityBoxMain).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                } else {
                                    setTimeout(function () {
                                        height = $(quantityBoxMain).parent().find('.bss_pb_img img').first().height();
                                        height = parseInt(height) + parseInt(marginTop);
                                        Ele = $(quantityBoxMain).parent().find('.bss_pb_img');
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                }
                            } else {
                                setTimeout(function () {
                                    if ($(quantityBoxMain).next().hasClass('bss_pb_img')) {
                                        if (!imgBadge.length) return;
                                        width = imgBadge.width();
                                        let naturalHeight = imgBadge[0].naturalHeight;
                                        let naturalWidth = imgBadge[0].naturalWidth;
                                        height = parseInt(width / naturalWidth * naturalHeight)
                                        Ele = $(quantityBoxMain).next();
                                        $(Ele).height(height + 'px');
                                    }
                                }, 300)
                            }
                        })
                    }
                }
            }
        });

        if (!appended) {
            // if not insert then check and insert to parent
            var isAllowInsert = !$(firstParent).hasClass('swatchProductColor') && !$(firstParent).hasClass('hero-content') && !$(firstParent).hasClass('critical-clear');
            if (isAllowInsert) {
                $.each(parents, function (index, parent) {
                    var htmlLabel = '',
                        htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
                    let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
                    let className = $(parent).attr('class');
                    htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                    htmlLabel += htmlList.join('');
                    htmlLabel += '</div>';
                    if (className && className.includes('quantity')) {
                        $(parent).after(htmlLabel);
                        appended = true;
                    }
                });

                if (!appended) {
                    let htmlLabel = '',
                        htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, firstParent);
                    let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
                    if (htmlList.length) {
                        htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                        htmlLabel += htmlList.join('');
                        htmlLabel += '</div>';
                        if (!(Shopify && Shopify.theme && Shopify.theme.name && (Shopify.theme.name.indexOf("Dawn") !== -1)) && BSS_PL.storeId !== 32515) {
                            $(firstParent).after(htmlLabel);
                        }
                    }

                }
            }
        }
    }
    BSS_PL.initForBadgeBuyItNowBtn = function ($, BSS_PL, dataRes, parents, item, prodData, foundFirstImage, page, firstParent) {
        let appended = false;
        $.each(parents, function (index, parent) {

            let marginTop = BSS_PL.getMaxValueMarginTop(dataRes);
            let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
            let htmlLabel = '',
                buyItNowEl = '',
                buyItNowMain = '',
                htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
            if (htmlList.length && !foundFirstImage) {
                htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px">';
                htmlLabel += htmlList.join('');
                htmlLabel += '</div>';

                // Find elemet for main add to cart button section in product page
                buyItNowMain = findMainClassForBadgeBuyItNow($, BSS_PL, parent, page);

                // Find elemet for common add to cart button section
                buyItNowEl = findElementClassForBadgeBuyItNow($, BSS_PL, parent, page);

                if (buyItNowEl.length && !appended) {
                    if (!buyItNowEl.next('.bss_pb_img').length) {
                        $(buyItNowEl).after(htmlLabel);
                        appended = true;

                        let width = 0;
                        let height = 0;
                        let Ele = 0;
                        let imgBadge = $(buyItNowEl).next().find('img.bss-pb-frontend');
                        dataRes.forEach((dataRes) => {
                            if (checkBadgeText(dataRes)) {
                                if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                    setTimeout(function () {
                                        height = $(buyItNowEl).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                        height = parseInt(height);
                                        Ele = $(buyItNowEl).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                } else {
                                    setTimeout(function () {
                                        height = $(buyItNowEl).parent().find('.bss_pb_img img').first().height();
                                        height = parseInt(height) + parseInt(marginTop);
                                        Ele = $(buyItNowEl).parent().find('.bss_pb_img');
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                }
                            } else {
                                setTimeout(function () {
                                    if ($(buyItNowEl).next().hasClass('bss_pb_img')) {
                                        if (!imgBadge.length) return;
                                        width = imgBadge.width();
                                        let naturalHeight = imgBadge[0].naturalHeight;
                                        let naturalWidth = imgBadge[0].naturalWidth;
                                        height = parseInt(width / naturalWidth * naturalHeight)
                                        Ele = $(buyItNowEl).next();
                                        $(Ele).height(height + 'px');
                                    }
                                }, 300)
                            }
                        })
                    }
                }
                if (buyItNowMain.length || (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1 && page == '' && $(buyItNowMain).closest('.product__info-wrapper').length)) {
                    if (Shopify && Shopify.theme && Shopify.theme.name && (Shopify.theme.name.indexOf("Sense") !== -1)) {
                        const appendBadgeByInterval = setInterval(() => {
                            if (!buyItNowMain.next('.bss_pb_img').length) {
                                $(buyItNowMain).after(htmlLabel);
                                appended = true;

                                let width = 0;
                                let height = 0;
                                let Ele = 0;
                                let imgBadge = $(buyItNowMain).next().find('img.bss-pb-frontend')
                                dataRes.forEach((dataRes) => {
                                    if (checkBadgeText(dataRes)) {
                                        if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                            setTimeout(function () {
                                                height = $(buyItNowMain).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                                height = parseInt(height);
                                                Ele = $(buyItNowMain).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                                $(Ele).height(height + 'px');
                                            }, 300)
                                        } else {
                                            setTimeout(function () {
                                                height = $(buyItNowMain).parent().find('.bss_pb_img img').first().height();
                                                height = parseInt(height) + parseInt(marginTop);
                                                Ele = $(buyItNowMain).parent().find('.bss_pb_img');
                                                $(Ele).height(height + 'px');
                                            }, 300)
                                        }
                                    } else {
                                        setTimeout(function () {
                                            if ($(buyItNowMain).next().hasClass('bss_pb_img')) {
                                                if (!imgBadge.length) return;
                                                width = imgBadge.width();
                                                let naturalHeight = imgBadge[0].naturalHeight;
                                                let naturalWidth = imgBadge[0].naturalWidth;
                                                height = parseInt(width / naturalWidth * naturalHeight)
                                                Ele = $(buyItNowMain).next();
                                                $(Ele).height(height + 'px');
                                            }
                                        }, 300)
                                    }
                                })
                            }
                            if (appended) {
                                clearInterval(appendBadgeByInterval);
                            }
                        }, 2000);
                    } else {
                        if (!buyItNowMain.next('.bss_pb_img').length) {
                            $(buyItNowMain).after(htmlLabel);
                            appended = true;

                            let width = 0;
                            let height = 0;
                            let Ele = 0;
                            let imgBadge = $(buyItNowMain).next().find('img.bss-pb-frontend')
                            dataRes.forEach((dataRes) => {
                                if (checkBadgeText(dataRes)) {
                                    if (squareShape.indexOf(dataRes.label_shape) !== -1) {
                                        setTimeout(function () {
                                            height = $(buyItNowMain).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text .bss-pb-frontend`).first().width();
                                            height = parseInt(height);
                                            Ele = $(buyItNowMain).next().find(`div[bss-config-id="${dataRes.label_text_id}"].bss_parent_text`);
                                            $(Ele).height(height + 'px');
                                        }, 300)
                                    } else {
                                        setTimeout(function () {
                                            height = $(buyItNowMain).parent().find('.bss_pb_img img').first().height();
                                            height = parseInt(height) + parseInt(marginTop);
                                            Ele = $(buyItNowMain).parent().find('.bss_pb_img');
                                            $(Ele).height(height + 'px');
                                        }, 300)
                                    }
                                } else {
                                    setTimeout(function () {
                                        if ($(buyItNowMain).next().hasClass('bss_pb_img')) {
                                            if (!imgBadge.length) return;
                                            width = imgBadge.width();
                                            let naturalHeight = imgBadge[0].naturalHeight;
                                            let naturalWidth = imgBadge[0].naturalWidth;
                                            height = parseInt(width / naturalWidth * naturalHeight)
                                            Ele = $(buyItNowMain).next();
                                            $(Ele).height(height + 'px');
                                        }
                                    }, 300)
                                }
                            })
                        }
                    }
                }
            }
        });

        if (!appended) {
            // if not insert then check and insert to parent
            var isAllowInsert = !$(firstParent).hasClass('swatchProductColor') && !$(firstParent).hasClass('hero-content') && !$(firstParent).hasClass('critical-clear');
            if (isAllowInsert) {
                $.each(parents, function (index, parent) {
                    var htmlLabel = '',
                        htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
                    let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
                    let className = $(parent).attr('class');
                    htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                    htmlLabel += htmlList.join('');
                    htmlLabel += '</div>';
                    if (className && className.includes('payment')) {
                        $(parent).after(htmlLabel);
                        appended = true;
                    }
                });

                if (!appended) {
                    let htmlLabel = '',
                        htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, firstParent);
                    let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
                    if (htmlList.length) {
                        htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                        htmlLabel += htmlList.join('');
                        htmlLabel += '</div>';
                        if (!(Shopify && Shopify.theme && Shopify.theme.name && (Shopify.theme.name.indexOf("Dawn") !== -1)) && BSS_PL.storeId !== 32515) {
                            $(firstParent).after(htmlLabel);
                        }
                    }

                }
            }
        }

        if (page == "products" && Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.includes("Sense")) {
            if ($('.shopify-payment-button .bss_pb_img').length) {
                $('.shopify-payment-button .bss_pb_img').remove()
            }
        }
    }
    // init function custom for pagefly (Thabi)
    BSS_PL.initForBadgePriceOnPageFly = function ($, BSS_PL, dataRes, parents, item, prodData, foundFirstImage, page) {
        $.each(parents, function (index, parent) {
            let marginTop = BSS_PL.getMaxValueMarginTop(dataRes);
            let htmlLabel = '',
                htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
            let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
            if (htmlList.length && !foundFirstImage) {
                htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                htmlLabel += htmlList.join('');
                htmlLabel += '</div>';

                if (page == 'collections') {
                    let mainPrice = $(parent).closest('[data-pf-type="ProductBox"]').find('[data-product-type="price"]').first();
                    if (mainPrice.length) {
                        let parentPrice = mainPrice.closest('[data-pf-type="Row"]');
                        if (parentPrice.length) {
                            if (!parentPrice.next('.bss_pb_img').length) {
                                parentPrice.after(htmlLabel);
                                setTimeout(function () {
                                    let height = $(parentPrice).parent().find('.bss_pb_img img').first().height();
                                    height = parseInt(height) + parseInt(marginTop);
                                    let Ele = $(parentPrice).parent().find('.bss_pb_img');
                                    $(Ele).height(height + 'px');
                                }, 300)
                            }
                        }
                    }
                } else {
                    if (BSS_PL.storeId == 5196) {
                        // fix for besserernten by ThaBi
                    } else {
                        let mainPrice = $(parent).closest('[data-pf-type="ProductBox"]').find('[data-product-type="price"]').first();
                        if (mainPrice.length) {
                            let parentPrice = mainPrice.parent();
                            if (parentPrice.length) {
                                if (!parentPrice.next('.bss_pb_img').length) {
                                    parentPrice.after(htmlLabel);
                                    setTimeout(function () {
                                        let height = $(parentPrice).parent().find('.bss_pb_img img').first().height();
                                        height = parseInt(height) + parseInt(marginTop);
                                        let Ele = $(parentPrice).parent().find('.bss_pb_img');
                                        $(Ele).height(height + 'px');
                                    }, 300)
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    BSS_PL.initForBadgeProductImageOnPageFly = function ($, BSS_PL, dataRes, parents, item, prodData) {
        let appended = false;
        $.each(parents, function (index, parent) {
            let marginTop = BSS_PL.getMaxValueMarginTop(dataRes);
            let htmlLabel = '',
                htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
            let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
            if (htmlList.length) {
                htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                htmlLabel += htmlList.join('');
                htmlLabel += '</div>';
                if (!$(parent).next('.bss_pb_img').length) {
                    $(parent).after(htmlLabel);
                }
                appended = true;
            }
            // If appended, set height for badge block
            if (appended) {
                setTimeout(function () {
                    let height = $(parent).parent().find('.bss_pb_img img.bss-pb-frontend').first().height();
                    height = parseInt(height) + parseInt(marginTop);
                    let Ele = $(parent).find('.bss_pb_img').first();
                    if (!Ele.length) {
                        Ele = $(parent).next('.bss_pb_img');
                    }
                    $(Ele).height(height + 'px');
                }, 300)
            }
        });
    }
    BSS_PL.initForBadgeProductNameOnPageFly = function ($, BSS_PL, dataRes, parents, item, prodData, foundFirstImage, page) {
        $.each(parents, function (index, parent) {
            let marginTop = BSS_PL.getMaxValueMarginTop(dataRes);
            let marginBottom = BSS_PL.getMaxValueMarginBottom(dataRes);
            let htmlLabel = '',
                htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);
            if (htmlList.length && !foundFirstImage) {
                htmlLabel += '<div class="bss_pb_img" style="display: block !important; margin-bottom: ' + marginBottom + 'px;">';
                htmlLabel += htmlList.join('');
                htmlLabel += '</div>';
            }

            let mainTitle = '';
            // fix for thelordofthemagic by Thabi
            if (BSS_PL.storeId == 9006 && page == 'products') {
                mainTitle = $(parent).siblings('[data-product-type="title"]');
            } else {
                mainTitle = $(parent).closest('[data-pf-type="ProductBox"]').find('[data-product-type="title"]');
            }

            if (mainTitle.length) {
                if (!mainTitle.next('.bss_pb_img').length) {
                    mainTitle.after(htmlLabel);
                    setTimeout(function () {
                        let height = $(mainTitle).parent().find('.bss_pb_img img').first().height();
                        height = parseInt(height) + parseInt(marginTop);
                        let Ele = $(mainTitle).parent().find('.bss_pb_img');
                        $(Ele).height(height + 'px');
                    }, 300)
                }
            }
        })
    }
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/pagefly/initPageFlyAdapter.js

function initPageFlyAdapter(BSS_PL, checkLanguageLabel) {
    BSS_PL.getProductInfoForPageFly = function ($, BSS_PL, url, page) {
        var dataRes = BSS_PL.configData;
        // check label base on language integrate with langify app (only for five and ten USD plan)
        if (BSS_PL.currentPlan && BSS_PL.currentPlan !== 'free') {
            dataRes = dataRes.filter(checkLanguageLabel);
        }

        var dataResLabel = dataRes.filter((item) => {
            return item.label_type == 1 || item.label_type == null;
        });

        //badge type 0 is bellow name, 1 is bellow product image, 2 is bellow custom selector, 3 is bellow product price
        var dataResBadgeName = dataRes.filter((item) => {
            return item.label_type == 2 && item.badge_type == 0
        });
        var dataResBadgeProductImage = dataRes.filter((item) => {
            return item.label_type == 2 && item.badge_type == 1
        });
        var dataResBadgeCustomSelector = dataRes.filter((item) => {
            return item.label_type == 2 && item.badge_type == 2
        });
        var dataResBadgePrice = dataRes.filter((item) => {
            return item.label_type == 2 && item.badge_type == 3
        });

        const checkBadgeStyle = () => {
            if($('.bss_pb_img').length){
                let bssBadges = $('.bss_pb_img');
                $.each(bssBadges, function (index, badge) {
                    if($(badge).css('position') !== 'relative'){
                        $(badge).css('position', 'relative');
                    }
                    if($(badge).css('min-height') !== '25px'){
                        $(badge).css('min-height', '25px');
                    }
                    setTimeout(function (){
                        let height = 0;
                        if($(badge).find('img.bss-pb-frontend').length || $(badge).find('.bss_pl_label_text').length) {
                            $.each($(badge).children(), function (index, badgeItem) {
                                let $badgeItem = $(badgeItem);
                                height = $badgeItem.height();
                                let badgeMarginTop = $badgeItem.css('margin-top');
                                height = parseInt(height) + parseInt(badgeMarginTop);
                                if(parseInt($(badge).height()) < height) {
                                    $(badge).height(height+'px');
                                }
                            })
                        }
                    }, 700)
                });
            }
        }

        var prodData = {
            baseImgUrl: bssPlApiServer + '/images/' + BSS_PL.storeId + '/240/'
        };

        function handleData(data){
            var responseProducts = [];
            try {
                responseProducts = JSON.parse(data);
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log('product label: JSON parse returns no item')
            }

            if (responseProducts.length) {
                responseProducts.map(function (item) {
                    prodData['collects'] = item.collections;
                    var pid = item.id;
                    var parents = $('[data-product-id="' + pid + '"][data-pf-type="ProductImage2"], ' +
                        '[data-product-id="' + pid + '"][data-pf-type="ProductImage"] [data-pf-type="MasterImage"],' +
                        '[data-product-id="' + pid + '"][data-pf-type="ProductMedia"] [data-media-type="image"]');
                    var firstParent = parents[0];
                    var foundFirstImage = false;
                    if (BSS_PL.storeId == 35460) {
                         parents = $('[data-product-id="' + pid + '"][data-pf-type="ProductImage2"], ' +
                            '[data-product-id="' + pid + '"][data-pf-type="ProductImage"] [data-pf-type="MasterImage"],' +
                            '[data-product-id="' + pid + '"][data-pf-type="ProductMedia2"] [data-media-type="image"]');
                    }
                    function initForLabel(dataRes) {
                        $.each(parents, function (index, parent) {
                            if (!$(parent).find('.bss_pl_img').length) {
                                var htmlLabel = '',
                                    htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent);

                                if (htmlList.length && !foundFirstImage) {
                                    htmlLabel += '<div class="bss_pl_img" style="display: block !important;">';
                                    htmlLabel += htmlList.join('');
                                    htmlLabel += '</div>';

                                    let customFlag = false
                                    /** FIX SUPPORT BY STORE ID */
                                    if (typeof bssFixSupportInitLabelPageFly == 'function') {
                                        // eslint-disable-next-line
                                        customFlag = bssFixSupportInitLabelPageFly($, parent, page, htmlLabel)
                                    }
                                    /** END FIX SUPPORT BY STORE ID */

                                    if(!customFlag){
                                        $(parent).prepend(htmlLabel)
                                    }
                                }
                            }
                        })
                    }

                    if(dataResLabel.length){
                        initForLabel(dataResLabel);
                    }
                    if(dataResBadgeProductImage.length){
                        BSS_PL.initForBadgeProductImageOnPageFly($, BSS_PL, dataResBadgeProductImage, parents, item, prodData);
                    }
                    if(dataResBadgeCustomSelector.length){
                        BSS_PL.initForBadgeCustomSelector($, BSS_PL, dataResBadgeCustomSelector, parents, item, prodData, foundFirstImage, page, firstParent);
                    }
                    if(dataResBadgePrice.length){
                        BSS_PL.initForBadgePriceOnPageFly($, BSS_PL, dataResBadgePrice, parents, item, prodData, foundFirstImage, page);
                    }
                    if(dataResBadgeName.length){
                        BSS_PL.initForBadgeProductNameOnPageFly($, BSS_PL, dataResBadgeName, parents, item, prodData, foundFirstImage, page);
                    }
                    checkBadgeStyle();
                });
            }
        }

        // fix compatitive with jquery version "lim" (don't support ajax call)
        if (BSS_PL.storeId === 4363) {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.onreadystatechange = () => {
                // In local files, status is 0 upon success in Mozilla Firefox
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    const status = xhr.status;
                    if (status === 0 || (status >= 200 && status < 400)) {
                        // The request has been completed successfully
                        handleData(xhr.responseText);
                    } else {
                        // Oh no! There has been an error with the request!
                    }
                }
            };
            xhr.send()
        } else {
            $.get(url, handleData);
        }
    }
    BSS_PL.addLabelForPageFly = function ($, BSS_PL) {
        var handleUrls = [];
        var selectedProductIds = $('[data-product-id]');
        var path = window.location.pathname.split('/');
        path.pop(-1);
        var page = path.pop(-2);

        selectedProductIds.attr('bss-pl-product-active', true);

        $.each(selectedProductIds, function( index, item ) {
            let id = $(item).attr('data-product-id');
            if (id.indexOf('product-') !== -1) {
                id = id.replace('product-', '')
            }
            if (id && id != '' && handleUrls.indexOf('id:"' + id + '"') === -1) {
                handleUrls.push('id:"' + id + '"');
            }
        });

        var urlData = '/search.js?q=' + handleUrls.join(' OR ') + '&view=bss.product.labels';
        var encodeUrlData = encodeURI(urlData);
        BSS_PL.getProductInfoForPageFly($, BSS_PL, encodeUrlData, page)
    }
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/label/excludeItem.js
function excludeItem($, BSS_PL, page, item) {
    if ($(item).hasClass("inline-item")) {
        return true;
    }
    if ($(item).hasClass("breadcrumb-active")) {
        return false;
    }
    if ($(item).hasClass("grid-link__title")) {
        return true;
    }
    // Fix for badge Express theme ( madu)
    if ($(item).hasClass('menu-navigation__item')) {
        return true;
    }
    // Fix for badge Brooklyn theme ( madu)
    if ($(item).hasClass('mobile-nav__link')) {
        return true;
    }
    // Fix for badge Venture theme ( madu)
    if ($(item).hasClass('drawer__nav-link')) {
        return true;
    }
    if ($(item).parent().hasClass('product-navigation')) {
        return true;
    }

    if ($(item).hasClass('breadcrumb_link')) {
        return true;
    }
    if ($(item).hasClass('page__navigation-item')) {
        return true;
    }

    if ($(item).hasClass('mini-cart__product-vendor')) {
        return true;
    }

    if ($(item).hasClass('mini-cart__product-title')) {
        return true;
    }
    if ($(item).hasClass('thumbnail') && $(item).hasClass('slick-slide')) {
        return true;
    }

    if ($(item).hasClass('button-main2') && $(item).hasClass('animated')) {
        return true;
    }

    if ($(item).hasClass('banner-full-link')) {
        return true;
    }

    if ($(item).hasClass('site-nav__link')) {
        return true;
    }
    if ($(item).parent().hasClass('product-single__description')) {
        return false;
    }
    if ($(item).parent().parent().hasClass('product-single__description')) {
        return true;
    }

    if ($(item).parent().hasClass('product-title') && $(item).hasClass('chp') && $(item).hasClass('cd')) {
        return true;
    }

    if ($(item).hasClass('thumbnail') && $(item).hasClass('thumbnail--media-image')) {
        return true;
    }

    if ($(item).hasClass('show-gallery')) {
        return true;
    }

    // fix for frontiera (by madu)
    if ($(item).hasClass('ssw-review-title')) {
        return true;
    }

    if ($(item).parent().hasClass('cart-mini-item-title')) {
        return true;
    }

    if ($(item).parent().hasClass('product-next') || $(item).parent().hasClass('product-prev')) {
        return true;
    }

    if ($(item).parent().hasClass('thumbItem')) {
        return true;
    }

    if ($(item).hasClass('product-gallery__link') && $(item).is('a')) {
        return true;
    }
    if ($(item).hasClass('jas_bg') && $(item).parent().hasClass('hover-img')) {
        return true;
    }

    if ($(item).parent('#breadcrumb').length) {
        return false;
    }

    if ($(item).parent('#gallery').length) {
        return true;
    }

    if (BSS_PL.storeId !== 1418) {
        if ($(item).attr('rel') == 'noopener noreferrer' && $(item).attr('target') == "_blank" || $(item).parent().is("span") || $(item).parent().parent().parent().hasClass('reading-container')) {
            return true;
        }
    }

    if ($(item).hasClass('ly-languages-switcher-link')) {
        return true;
    }
    if ($(item).closest('div.rte').find('em').length) {
        return true;
    }

    if ($(item).parent('.mini_cart_item').length) {
        return true;
    }

    if ($(item).parent('li[data-thumb]').length) {
        return true;
    }

    if ($(item).hasClass('image--container') && $(item).parent().parent().hasClass('product-page--thumb')) {
        return false;
    }
    if ($(item).hasClass('product-page--next') && $(item).hasClass('right')) {
        return true;
    }

    if ($(item).hasClass('clicker-thumb')) {
        return true;
    }
    if ($(item).hasClass('product-single__thumbnails-item')) {
        return true;
    }
    // fix cbon-cwallon
    if ($(item).parent().hasClass('breadcrumbs')) {
        return true;
    }
    // fix for herbcottage
    if ($(item).parent().hasClass('page-navigation-arrows')) {
        return true;
    }
    //  fix for oddgoods
    if ($(item).closest('.tmenu_submenu').length) {
        return true;
    }
    if ($(item).parent().hasClass('product-description__no-expand')) {
        return true;
    }
    if ($(item).hasClass('bubble-product-link')) {
        return true;
    }
    // fix for bluecrateuk (by madu)
    if ($(item).closest('.promo_banner__content').length) {
        return true;
    }
    // fix for ocean-baby-limited (by madu)
    if ($(item).hasClass('product-page--previous') || $(item).hasClass('product-page--next')) {
        return true;
    }
    // Fix for ceylon-supermart (madu)
    if ($(item).hasClass('standard-link') || $(item).hasClass('more-link')) {
        return true;
    }

    /** FIX SUPPORT BY STORE ID */
    if (typeof bssFixSupportExcludeItem == 'function') {
        // eslint-disable-next-line
        return bssFixSupportExcludeItem($, page, item)
    }
    /** END FIX SUPPORT BY STORE ID */

    return false;
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/label/addToFirstParent.js

function addToFirstParent($, appended, dataRes, item, prodData, firstParent, page) {
    if (!appended) {
        var htmlLabel = '',
            htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, firstParent);
        // labeledParent.push(firstParent)
        var isAllowInsert = !$(firstParent).hasClass('swatchProductColor') && !$(firstParent).hasClass('hero-content');
        if (htmlList.length && isAllowInsert) {
            var isAbsoluteFirstParent = $(firstParent).css("position") == "absolute";
            var isParentBelongToGallery = $(firstParent).hasClass('aspect-ratio') && $(firstParent).parent().hasClass('product-gallery__thumbnail');
            //Fix bug
            var isInSpareAndSquareSlides = $(firstParent).hasClass("image-slide-link") && $(".product_gallery .slides").length;
            if (isInSpareAndSquareSlides) {
                firstParent = $(".product_gallery .slides");
            }

            var isUltramaticSleepSlides = $(".lh-big-slide .swiper-container").length;
            if (isUltramaticSleepSlides) {
                firstParent = $(".lh-big-slide .swiper-container");
            }

            var isNobitaShop = $(firstParent).hasClass("product-single__photo-wrapper") && $(".product-single__photos.slick-slider").length;

            if (isNobitaShop) {
                firstParent = $(".product-single__photos.slick-slider");
            }
            var isGrillToGoProItemHomepage = $(firstParent).hasClass('js-product') && $(firstParent).hasClass('product') && $(firstParent).find('.product__media');

            if (isGrillToGoProItemHomepage) {
                firstParent = $(firstParent).find('.product__media');
            }
            var isGrillToGoFeaturedProduct = $(firstParent).hasClass('section__title-text') && $(firstParent).hasClass('product-featured__title-text');

            if (isGrillToGoFeaturedProduct) {
                firstParent = $(firstParent)
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .find(".product-featured__photo__item")

            }
            // fix label for home page vital pharmacy supplies
            if ($(firstParent).hasClass('product-item--horizontal') && $(firstParent).find('.aspect-ratio ')) {
                firstParent = $(firstParent).find('.aspect-ratio');
            }

            // End

            // Fix bugs for featured product on Venture theme homepage
            if ($(firstParent).hasClass('flex__item') && $(firstParent).find('.product-single__photo.product__photo-container ')) {
                firstParent = $(firstParent).find('.product-single__photo.product__photo-container ');
            }
            // End fix for venture theme home page


            if (isParentBelongToGallery) {
                firstParent = $('.product-gallery__carousel');
            }

            if (isAbsoluteFirstParent) {
                // fix for boomwatches by TA
                // fix for jlood and odisri by ViTu
                //  fix for proaim by ThaBi
                // fix for repair by XuTho 1393
                // fix for shop.ledvance by ThaBi
                // fix for remlagret by ThaBi
                // fix for le-meuble by ThaBi
                // fix for gaylemansfield by HoangPN
                // fix for fitnessexchange by HoangPN
                // fix for msqueend by HuyNT
                // fix for doublebayhardware by HoangPN
                // fix bug for prueba-ti-dimerc by vani
                // fix bug for robinsons by Vaho
                let storeIdArray = [18509, 19111, 30665, 28337, 16399, 24809, 24392, 20841, 19976, 15661, 3010, 1244, 5558, 19664, 20591, 5460, 5590, 19743, 5738, 5793, 1393, 3341, 547, 6242, 4526, 4989, 6913, 6292, 5420, 5180, 8302, 8721, 11867, 10326, 12623, 13156, 16153, 16147, 17455, 11052, 21994, 23105, 26296, 23161, 12388, 10798, 8394, 32855, 15997,23876,17020, 20059];
                if (storeIdArray.indexOf(BSS_PL.storeId) !== -1) {
                    // do nothing
                }
                else {
                    $(firstParent).wrapInner("<div class='bss_pl_img_wrapper' style='position:relative' />");
                }
            } else {
                // fix for proaim by ThaBi
                //fix for shop.ledvance by ThaBi
                let storeIdArray = [5558, 5460, 5590, 5738, 5793, 3341];
                if (storeIdArray.indexOf(BSS_PL.storeId) !== -1) {
                    // do nothing
                }
                // fix for suitmeup by ThaBi
                else if (BSS_PL.storeId == 2749 && page == 'collections') {
                    // do nothing
                }
                else {
                    $(firstParent).css("position", "relative");
                }
            }
            //Fix bugs for highcultured.my
            if ($(firstParent).hasClass('product-fancybox')) {
                var container = $(firstParent).parent().parent();
                if ($(container).hasClass("product-image-container")) {
                    firstParent = container;
                }
            }

            htmlLabel += '<div class="bss_pl_img" style="display: block !important;">';
            htmlLabel += htmlList.join('');
            htmlLabel += '</div>';

            if (isAbsoluteFirstParent) {
                if (BSS_PL.storeId == 3010) {
                    if (!$(firstParent).find('.bss_pl_img').length) {
                        $(firstParent).prepend(htmlLabel);
                    }
                }
                //fix for remlagret by ThaBi
                else if (BSS_PL.storeId == 4526 && page == 'products') {
                    // do nothing
                }
                else {
                    $(firstParent).find('.bss_pl_img_wrapper').append(htmlLabel)
                }

            } else {
                if (!$(firstParent).find('.bss_pl_img').length) {
                    // fix for enji by ThaBi
                    if (BSS_PL.storeId == 8172 && page == 'products') {
                        return;
                    } else if (BSS_PL.storeId == 16487 && page == 'products') {
                        return;
                    } else if (BSS_PL.storeId == 35114 && page == '') {
                        return;
                    } else {
                        $(firstParent).prepend(htmlLabel);
                    }
                }
            }
        }


    }
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/label/fixBugGlobal.js
function fixBugGlobal($, BSS_PL, parent, page, htmlLabel) {
    let appended = false;
    if ($(parent).hasClass('product-item__link-wrapper')) {
        if ($(parent).find('.product-item__image-container').length) {
            $(parent).find('.product-item__image-container').prepend(htmlLabel);
            appended = true;
        }

        else {
            $(parent).find('img').wrap('<div class="product-item__image-container"></div>');
            $(parent).find('.product-item__image-container').prepend(htmlLabel);
            appended = true;
        }
    }
    else if ($(parent).hasClass("card__inner") && $(parent).closest(".card-wrapper").find(".card__inner .card__media").length) {
        let element = $(parent).find(".card__content")
        if (element.length && !element.parent().find(".bss_pl_img").length) {
            $(".card--media").css("z-index", "0");
            $(".card--media .card__inner").css("transform", "none");
            element.prepend(htmlLabel)
            appended = true;
        }
    }
    // fix for Feature product theme Refresh
    else if ($(parent).hasClass("card__heading") && $(parent).closest(".card-wrapper").find(".card__inner .card__content").length) {
        let element = $(parent).closest(".card-wrapper").find(".card__inner .card__content")
        if (element.length && !element.parent().find(".bss_pl_img").length) {
            element.prepend(htmlLabel)
            appended = true;
        }
    }
    // fix theme Carft by HoanPV
    else if ($(parent).hasClass('card__heading') && !$(parent).closest('.card__inner').find('.bss_pl_img').length && BSS_PL.storeId != 34712) {
        $(parent).closest('.card__inner').prepend(htmlLabel);
        appended = true
    }
    // fix theme Venture by NhatHN
    else if ($(parent).hasClass("cart__image") && !$(parent).closest('.cart__cell--imager').find('.bss_pl_img').length && ![34096, 35042, 36181].includes(BSS_PL.storeId)) {
        $(parent).prepend(htmlLabel);
        $(parent).children().wrapAll("<div class='bss_wrapper' />");
        $('.bss_wrapper').css("position", "relative");
        $('.bss_wrapper').css("width", "fit-content");
        $('.bss_wrapper').css("margin", "0 auto");
        appended = true;
    }
    // fix theme Simple by NhatHN
    else if ($(parent).hasClass("cart__image-container") && !$(parent).closest('.cart__image-wrapper').find('.bss_pl_img').length && BSS_PL.storeId != 34096) {
        $(parent).prepend(htmlLabel);
        appended = true;
    }
    // fix theme Narrative by NhatHN
    else if ($(parent).hasClass("cart-item__image-wrapper") && !$(parent).closest('.cart-item').find('.bss_pl_img').length) {
        $(parent).find('.cart-item__image-link').prepend(htmlLabel);
        appended = true;
    }
    // fix for cart theme Debut
    else if ($(parent).hasClass('cart__image-wrapper') && $(parent).parent().hasClass('cart__product-information') && window.location.pathname.includes('/cart')) {
        if (!$(parent).find('.bss_pl_img').length) {
            $(parent).prepend(htmlLabel);
            $(parent).children().wrapAll("<div class='bss_wrapper' />");
            $('.bss_wrapper').css("position", "relative");
            if ($(parent).find(".cart__image").width() < $(parent).find(".cart__image").height()) {
                $(parent).find('.bss_wrapper').css('margin', `0 ${$(parent).find(".cart__image").css('margin-right')}`)
            }
            appended = true;
        }
    }
    // fix theme Simply by NhatHN
    else if ($(parent).hasClass("cart-image") && !$(parent).closest('.grid-item').find('.bss_pl_img').length) {
        $(parent).prepend(htmlLabel);
        appended = true;
    }
    // fix theme Express by NhatHN
    else if ($(parent).hasClass('cart__table-cell') && !$(parent).find('.bss_pl_img').length) {
        $(parent).prepend(htmlLabel);
        appended = true;
    }
    // fix theme Minimal by NhatHN
    else if ($(parent).parent().hasClass('cart__image-wrapper') && !$(parent).closest('.cart__image-wrapper').find('.bss_pl_img').length) {
        $(parent).prepend(htmlLabel);
        appended = true;
    }
    // fix theme Boundless by NhatHN
    else if ($(parent).parent().hasClass('cart__table-cell--image') && !$(parent).closest('.cart__table-cell--image').find('.bss_pl_img').length) {
        $(parent).prepend(htmlLabel);
        $(parent).children().wrapAll("<div class='bss_wrapper' />");
        $('.bss_wrapper').css("position", "relative");
        $('.bss_wrapper').css("width", "fit-content");
        $('.bss_wrapper').css("margin", "0 auto");
        let widthImg = $(parent).find('.cart__image').width();
        $(parent).find('.cart__image').css('padding-right', 0);
        $(parent).find('.cart__image').css('width', `${widthImg}px`);
        appended = true;
    }
    else if ($(parent).hasClass('product__info-container') && !$(parent).closest('.featured-product').find('.bss_pl_img').length) {
        $(parent).closest('.featured-product').find('.product__modal-opener').prepend(htmlLabel);
        appended = true
    }
    else if ($(parent).hasClass('product__modal-opener') && BSS_PL.storeId != 32392) {
        $(parent).prepend(htmlLabel);
        appended = true
    }
    // Fix for Feature product theme Boundless (madu)
    else if ($(parent).is('.product__photo.featured-product__photo') && page == '' && $(parent).find('.featured-product__photo-wrapper .product__photo--single').length) {
        $(parent).find('.featured-product__photo-wrapper .product__photo--single').prepend(htmlLabel);
        appended = true;
    }
    // Fix for Feature product theme Brooklyn (madu)
    else if ($(parent).is('.grid__item.product-single__meta--wrapper') && page == '' && $(parent).closest('.grid.product-single').find('.product-single__media-wrapper .product-single__media').length) {
        $(parent).closest('.grid.product-single').find('.product-single__media-wrapper .product-single__media').prepend(htmlLabel);
        appended = true;
    }

    else if ($(parent).hasClass('grid-view-item')) {
        // Fix bugs for deckout-in, labels doesn't show on featured collection. and guest guatemala with incorrect position
        let findRealProductImage = $(parent).find('.grid-view-item__image-wrapper');
        if (findRealProductImage.length) {
            if (BSS_PL.storeId == 3220 && $(findRealProductImage).find('.img-holder').length) {
                // Fix for laagam responsive bug (madu)
                $(findRealProductImage).find('.img-holder').after(htmlLabel);
            } else {
                findRealProductImage.prepend(htmlLabel);
            }
            appended = true;
        } else if (BSS_PL.storeId == 4163) {
            var item2 = $(parent).find('div.reveal')
            if (item2.length) {
                item2.prepend(htmlLabel)
                appended = true
            }
        }
    }
    // Fix for oddgoods (by madu)
    else if ($(parent).hasClass('rimage-wrapper') && page == 'products') {
        let firstEl = $(parent).closest('.product-detail__images').find('.rimage-wrapper').first();
        if (firstEl.find('.bss_pl_img').length == 0) {
            firstEl.prepend(htmlLabel);
            appended = true;
        }
    }
    else if ($(parent).find('.product-card__image-with-placeholder-wrapper').length) {
        $(parent).find('.product-card__image-with-placeholder-wrapper').prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-single__media')) {
        // Fixed product slide for Debut theme
        if ($(parent).parent().hasClass('product-single__media-wrapper')) {
            $(parent).prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('product-single__photo') && !$(parent).parent().hasClass('photos__item photos__item--main') && BSS_PL.storeId != 19256 && BSS_PL.storeId != 35430 ) {
        // Fixed product slide for Debut theme - old version
        if ($(parent).parent().hasClass('product-single__photo-wrapper')) {
            $(parent).prepend(htmlLabel);
            appended = true;
        }
        // fix lable for gloriabazar
        let correctElement = $(parent).parent().parent();
        if (correctElement.hasClass('slick-list') && !correctElement.children().hasClass('bss_pl_img')) {
            correctElement.prepend(htmlLabel)
            appended = true;
        }


    } else if ($(parent).hasClass('product-single__photos')) {
        // Fixed bug product galleries on product page for fineradioshop
        if ($(parent).parent().hasClass('product-single__featured-image-wrapper')) {
            $(parent).prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('featured-product__photo')) {
        //Fix for featured product on Boundless theme
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product__photo-wrapper') && $(parent).hasClass('product__photo-wrapper-product-template')) {
        //Fix on product page venture theme
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('grid-product__image-wrapper')) {
        //Fix bugs for brooklyn theme, labels at footer with incorrect position
        if ($(parent).find('.product--wrapper').length) {
            $(parent).find('.product--wrapper').prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('product__gallery')) {
        //Fix for featured product on home page of Express Theme
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-card--list')) {
        //Fix for featured collection at home page of Express theme
        if ($(parent).find('.product-card__image-wrapper').length) {
            $(parent).find('.product-card__image-wrapper').prepend(htmlLabel);
            appended = true;
        }

    } else if ($(parent).hasClass('product-media--featured-product')) {
        // Fix for featured product of Narrative theme
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('card') && $(parent).hasClass('critical-clear')) {
        // Fix for collection products of Narrative theme
        $(parent).find('.card__image-wrapper').prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('grid-item') && $(parent).find('.product-grid-image--centered').length) {
        //Fix for collection products of Supply theme
        let supplyThemeProductElement = $(parent).find('.product-grid-image--centered');
        supplyThemeProductElement.css('position', 'relative');
        supplyThemeProductElement.prepend(htmlLabel);
        appended = true;
    } else if ($(parent).attr('itemprop') == "offers") {

        if ($('.grid-item .no-js.product__image-wrapper').length) {
            //Fix bugs for featured product on Supply Theme
            $('.grid-item .no-js.product__image-wrapper').prepend(htmlLabel);
        } else if ($('.product-single__hero .grid__item .product-single__photos').length) {
            //Fix bugs for featured product on Minimal Theme
            $('.product-single__hero .grid__item .product-single__photos').css('position', 'relative').prepend(htmlLabel);
        }

        appended = true;
    } else if ($(parent).hasClass('product__img-wrapper') && BSS_PL.storeId != 30628) {
        // Fix for minimal theme on home page
        $(parent).prepend(htmlLabel);
        appended = true;
    }
    else if ($(parent).hasClass('product-single__photo-wrapper') && $(parent).parent().hasClass('product-single__photo--container')) {
        $(parent).css('position', 'relative').prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-single__photo-wrapper') && $(parent).parent().hasClass('grid__item') && BSS_PL.storeId != 19256 && BSS_PL.storeId != 35430 ) {
        $(parent).css('position', 'relative').prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('feature-row__text') && $(parent).hasClass('feature-row__item')) {
        //Fix Aroma bug on featured product at home page && remove for radio shop
        let parentWrapper = $(parent).parent();
        if (parentWrapper.find('.feature-row__image-wrapper').length && !parentWrapper.find(".supports-js").length) {
            parentWrapper.find('.feature-row__image-wrapper').prepend(htmlLabel);
        }
        appended = true;

    } else if ($(parent).hasClass('slideshow__slide')) {
        // Fix bugs for deckout-in, label appear on slide
        appended = true;
    } else if ($(parent).hasClass('product__image-container')) {
        // Fix for narrative theme on product page with multiple variants
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-gallery--image-background') && $(parent).parent().hasClass('product-gallery--media')) {
        //Fix bugs for Estylopro at product page gallery slider
        $(parent).parent().prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('zoomGalleryActive') && $(parent).parent().hasClass("slick-slide")) {
        //Fix bugs for Kookint at product page gallery slider
        $(".pt-product-single-img").prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('cbb-also-bought-product') && $(parent).find('a').length) {

        // fix for hilife-vitamins
        if (BSS_PL.storeId == 2241) {
            let correctParent = $(parent).find('.cbb-also-bought-product-image').closest('a')
            if (correctParent.length) {
                correctParent.prepend(htmlLabel)
                appended = true
            }
        }
        //Fix bugs for Kookint at product page also bought
        else {
            $(".pt-product-single-img").find("a").prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('product-block') && $(parent).has('grid__item')) {
        //Fix bugs for dutahome
        if ($(parent).find('.product-block__image').length) {
            $(parent).find('.product-block__image').prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('image__container')) {
        $(parent).css("position", "relative");
        $(parent).prepend(htmlLabel);
        appended = true;
    }
    //fix for missodd by tungnk
    else if ($(parent).hasClass('product-item') && $(parent).find('.product-item__image-wrapper').length && BSS_PL.storeId != 22672) {
        //fix bug for boxxco
        let correctElement = $(parent).find('.product-item__image-wrapper');
        correctElement.css("position", "relative");
        correctElement.prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-item') && $(parent).find('.product-item__thumbnail').length) {
        let correctElement = $(parent).find('.product-item__thumbnail');
        correctElement.css("position", "relative");
        correctElement.prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product__main-photos')) {
        if ($(parent).hasClass('aos-animate')) {
            appended = true;
        } else {
            $(parent).prepend(htmlLabel);
            appended = true;
        }


    } else if ($(parent).hasClass("product-thumb")) {
        if ($(parent).parent().hasClass("collection-products-wrapper")) {
            $(parent).prepend(htmlLabel);
            appended = true;
        }
        if (BSS_PL.storeId == 2656) {
            //Fix for naturalid
            appended = true;
        }
    } else if ($(parent).parent().hasClass('shopify-product-gallery__image')) {
        $(parent).parent().prepend(htmlLabel);
        appended = true;
    } else if (!$(parent).hasClass('product-collection__image') && !$(parent).hasClass('tt-image-box') && $(parent).parent().parent().hasClass('slick-slide') && BSS_PL.storeId != 19256 && BSS_PL.storeId != 33551) {
        $(parent).parent().prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass("productitem")) {
        // fix bugs for www.taut-strap.co.uk
        let childItem = $(parent).find(".productitem--image-link");
        if (childItem.length) {
            childItem.css("position", "relative");
            childItem.prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass("o-layout__item")) {
        //Fix bugs for inabox.de
        var childItem = $(parent).find(".product__media");
        if (childItem.length) {
            childItem.css("position", "relative");
            childItem.prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('product-single__photo__item') && $(parent).hasClass('slick-slide')) {
        //Fix bugs for inabox.de on product page
        $(parent).css("position", "relative");
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-galley--image-background')) {
        $(parent).css("position", "relative");
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('grid-product__content') && BSS_PL.storeId != 22555 && BSS_PL.storeId != 34096 && BSS_PL.storeId != 35115 && BSS_PL.storeId != 11990 && BSS_PL.storeId != 29966) {
        if (BSS_PL.storeId === 2788 || BSS_PL.storeId === 29208) {
            let element = $(parent).find('.grid-product__link').find('.grid-product__image-mask')
            if (element.length) {
                element.prepend(htmlLabel);
                appended = true;
            }
        } else {
            $(parent).css("position", "relative");
            $(parent).prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('thumbnail') && $(parent).hasClass('columns')) {
        //fix bugs for okperfumes on collection page.
        if ($(parent).find('.product_image').length) {
            $(parent).find('.product_image').prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('fancybox') && $('#shopify-section-product-template .flexslider').length) {
        // $('#shopify-section-product-template .flexslider')
        $(parent).parent().prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('rimage-wrapper') || $(parent).hasClass('rimage-outer-wrapper')) {
        //Fix for slick slider www.mossimo.ph
        if (!$(parent).parent().parent().hasClass('thumbnail--media-image')) {
            $(parent).prepend(htmlLabel);
        }
        appended = true;
    } else if ($(parent).hasClass('product-media--image') && $(parent).parent().hasClass('main')) {
        // Fix for bestow
        if (($(parent).find(".bss_pl_img").length == 0)
            && ($(parent).find('.rimage-wrapper[data-handle]').length == 0)
        ) {
            $(parent).css("position", "relative");
            $(parent).prepend(htmlLabel);
            appended = true;
        }

    } else if (!$(parent).hasClass('recomatic-product-wrap') && $(parent).hasClass('swiper-slide') && $(parent).parent().hasClass('swiper-wrapper')) {
        $(parent).css("position", "relative");
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-single__photo') && $(parent).parent().hasClass('photos__item photos__item--main')) {

        // var linkElement = $(parent).find(".js-modal-open-product-modal");
        // if (linkElement.length > 0) {
        //     $(linkElement).wrapInner("<div class='bss_pl_img_wrapper' style='position:relative; display: inline-block' />");
        //     var correctElement = $(parent).find(".bss_pl_img_wrapper");
        //     $(correctElement).prepend(htmlLabel);
        //     appended = true;
        // }
        //Fix for trendify
        $(parent).prepend(htmlLabel);
        appended = true;

    } else if (BSS_PL.storeId != 17149 && $(parent).hasClass('prod-image')) {
        let correctParent = $(parent).parent();
        if ($(correctParent).hasClass('prod-container')) {
            $(correctParent).css("position", "relative");
            $(correctParent).prepend(htmlLabel);
            appended = true;
        }
    } else if (BSS_PL.storeId != 17162 && $(parent).hasClass('aspect-ratio') && $("#shopify-section-product-template .flickity-viewport").length) {
        var flickViewPort = $("#shopify-section-product-template .flickity-viewport");
        if ($(flickViewPort).find(".bss_pl_img").length == 0) {
            $(flickViewPort).prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('product-single__meta')) {
        var parentLevel2 = $(parent).parent().parent();
        var imageWrapperElement = parentLevel2.find(".product-single__featured-image-wrapper");
        if (imageWrapperElement.length) {
            $(imageWrapperElement).prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('featured-img')) {
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('c-slide-product__wrap-image') && $(parent).hasClass('slick-slide')) {
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('image-cont') && $(parent).hasClass('with-secondary-image')) {
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('cart-mini-item-image')) {
        appended = true;
    } else if ($(parent).hasClass('product-gallery--media-wrapper')) {
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('snize-product')) {
        //Fix for https://www.eyefoodfactory.pro/, search page
        if (BSS_PL.storeId == 16487 && page == "collections") {
            // do nothing
        } else {
            let correctChild = $(parent).find('.snize-thumbnail');
            if (correctChild.length) {
                $(correctChild).prepend(htmlLabel);
                appended = true;
            }
        }
    } else if ($(parent).hasClass('fotorama__stage__frame') || $(parent).parent().hasClass('product-page-gallery__thumbnail')) {
        let correctParent = $('.product-page-gallery__main--single.product-page-gallery__main');
        if (correctParent.length && correctParent.find('.bss_pl_img').length == 0) {
            $(correctParent).css("position", "relative");
            $(correctParent).prepend(htmlLabel);
        }
        appended = true;
    } else if ($(parent).hasClass('ProductItem__Wrapper') && BSS_PL.storeId != 2828 && BSS_PL.storeId != 29924 && BSS_PL.storeId != 14064 && BSS_PL.storeId != 14983 && BSS_PL.storeId != 11115 && BSS_PL.storeId != 34599) { //fix for onglesteph by tungnk
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('tt-image-box') && BSS_PL.storeId != 30504) {
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('tt-layout-vertical')) {
        let correctChild = $(parent).find('.tt-img');
        if (correctChild.length) {
            $(correctChild).prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('mediaimageholder')) {
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('zoom-container') && BSS_PL.storeId != 11262) {
        let correctParent = $('#shopify-section-product__main .product-gallery__main .flickity-viewport');
        if (correctParent.length) {
            $(correctParent).prepend(htmlLabel);
        } else {
            $(parent).prepend(htmlLabel);
        }
        appended = true;
    } else if ($(parent).hasClass('recomatic-product-wrap')) {
        let correctChild = $(parent).find('.recomatic-image-wrap');
        if (correctChild.length) {
            $(correctChild).prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('product-element-top')
        && ($(parent).parent().parent().hasClass('owl-carousel-item-inner') || $(parent).parent().hasClass('product-grid-item'))) {
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('product-collection__image')) {
        // Fixed for https://madbutchermeat.com/
        // fix label for ionickiss.si
        if (page === 'products' && $(parent).hasClass('product-image--hover-fade') && BSS_PL.storeId == 2350) {
            appended = true;
        } else {
            $(parent).prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('gf_module-center')) {
        $(parent).find('a').prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('vtl-product-card__header')) {
        $(parent).find('.vtl-product-card__image').prepend(htmlLabel);
        appended = true;
    } else if ($(parent).parent().hasClass('product-top') && $(parent).hasClass('product-image') && BSS_PL.storeId != 25867) {
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('fancybox') && $(parent).parent().hasClass('thumb')) {
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('proHImage') || $(parent).hasClass('proFeaturedImage')) {
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).hasClass('vtl-pb-main-widget__product-image')) {
        let correctParent = $(parent).find('a')
        if (correctParent.length) {
            correctParent.prepend(htmlLabel);
            correctParent.css('text-decoration', 'none')
        }
        var contentHtml = $(parent).find('.bss-pl-frontend')
        if (contentHtml.length) {
            contentHtml.css('position', 'relative')
        }
        appended = true;

    } // fix label for littleunicorn
    else if ($(parent).hasClass('photo-zoom-link ')) {
        let correctParent = $(parent).parent().parent()
        if (correctParent.hasClass('product-image-main')) {
            correctParent.prepend(htmlLabel)
        }
        appended = true;
    } else if ($(parent).hasClass('image--container') && $(parent).parent().hasClass('image--root')) {
        //Fix for https://www.valleyislekombucha.com/
        let correctParent = $(parent).parent().parent().parent();
        if (correctParent.hasClass('modal--link') && (correctParent.find('.bss_pl_img').length == 0)) {
            correctParent.prepend(htmlLabel);
            appended = true;
        }
    } else if ($(parent).hasClass('mthumb') && $(parent).parent().hasClass('owl-item')) {
        $(parent).prepend(htmlLabel);
        appended = true;
    } else if ($(parent).is("#bigimage")) {
        $(parent).prepend(htmlLabel);
        appended = true;
    }
    // fix label for hairclub
    else if ($(parent).hasClass("position-relative")) {
        $(parent).prepend(htmlLabel);
        appended = true;
    }
    // fix for cwallon
    else if ($(parent).hasClass("image-container-position")) {
        let correctParent = $(parent).parent().parent()
        if (correctParent.hasClass("image-container") && !correctParent.find('.bss_pl_img').length) {
            // remove label on thumbnail & logo for italianfoodonlinestore (madu)
            if (($(parent).closest('header').length || $(parent).find('img.secondary-image').length) && BSS_PL.storeId == 5068) {
                appended = true;
            } else {
                correctParent.prepend(htmlLabel);
                appended = true;
            }
        }
    }
    // fix for theme express
    else if ($(parent).hasClass('gallery__image-wrapper') && $(parent).hasClass('gallery__image-wrapper--scale')) {
        $(parent).prepend(htmlLabel)
        appended = true
    }

    // fix for msmugs by TA
    else if ($(parent).parent().hasClass('product-form--regular') && BSS_PL.storeId == 2163) {
        let parent2 = $(parent).closest('.product--outer');
        var itemImg = parent2.find('.product-gallery.hover-zoom-enabled');
        if (itemImg.length) {
            itemImg.prepend(htmlLabel);
            appended = true
        }

    }
    // fix for homebound by NhatHN
    else if ($(parent).hasClass('colorful-left-img-wrapper') && $(parent).parent().hasClass('colorful-left') && BSS_PL.storeId == 3561) {
        $(parent).prepend(htmlLabel)
        appended = true
    }
    // fix for narrative theme
    else if ($(parent).hasClass('product__submedia-wrapper') || $(parent).hasClass('product__media-wrapper')) {
        $(parent).prepend(htmlLabel)
        appended = true
    }

    // Fix for minimal theme on product page, product slider
    else if ($(parent).parent().hasClass('product-single__image-wrapper')) {
        let parentLevel2 = $(parent).parent();
        parentLevel2.css('position', 'relative').prepend(htmlLabel);
        appended = true;
    }
    // Fix for supply
    else if ($(parent).hasClass('product__image-wrapper') && $(parent).hasClass('no-js')) {
        $(parent).prepend(htmlLabel);
        appended = true;
    }
    // boundless
    else if ($(parent).hasClass('product__photo--single')) {
        $(parent).prepend(htmlLabel);
        appended = true;
    }
    // fix rapid search app by vitu
    if (window.location.pathname.includes('/rapid-search-results')) {
        if ($(parent).hasClass('rps-product-image-container')) {
            $(parent).prepend(htmlLabel);
            appended = true
        }
    }
    // fix variant with add variant id to theme by XuTho
    if (page == "products" && $('[appendvariant = true]') && !$('[appendvariant = true]').find('.bss_pl_img').length) {
        $('[appendvariant = true]').append(htmlLabel);
        appended = true;
    }
    // fix label compatible with Tapita app builder by HuyNT
    if ($('.type_product_scroll') || $('.type_product_grid')) {
        if ($(parent).hasClass('card-information__text')) {
            let parent1 = $(parent).closest('.card-wrapper').find('.card__inner .media');
            if ($(parent1).length && !$(parent1).find('.bss_pl_img').length) {
                parent1.prepend(htmlLabel);
                appended = true
            }
        }
    }
    //fix label compatible with Beae - Pgage builder by tungnk
    if (window.location.pathname.includes("/pages") && $(".beae-builder") && $(".beae-builder").length) {
        $(".beae-product-single__add-to-cart--dynamic-checkout").css({ "flex-direction": "column" })
        $(".shopify-payment-button").css({ "margin-bottom": "15px" })
        if ($(parent).hasClass("beae-product-single__media--image")) {
            $(parent).prepend(htmlLabel)
            appended = true
        }
        if ($(parent).hasClass("beae-product-media")) {
            $(parent).prepend(htmlLabel)
            appended = true
        }
    }
    // XuTho fix code compatible theme dawn 2.0
    if ((BSS_PL.storeId !== 31585) && (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1)) {
        if ($(parent).hasClass('card-information__text') || $(parent).hasClass('card__heading')) {
            let parent1 = $(parent).closest('.card-wrapper').find('.card__media');
            if ($(parent1).length && !$(parent1).find('.bss_pl_img').length) {
                parent1.prepend(htmlLabel);
                appended = true
            }
        }
        if ($(parent).hasClass('product__media')) {
            $(parent).prepend(htmlLabel);
            appended = true
        }
        if ($(parent).hasClass('product__info-container')) {
            let parent2 = $(parent).closest('.featured-product').find('.product__media');
            if ($(parent2).length && !$(parent2).find('.bss_pl_img').length) {
                parent2.prepend(htmlLabel);
                appended = true
            }
        }
    }

    // handle the parent closest to the cart form (in cart page)
    if ($(parent).closest('form[action="/cart"]').length && !$(parent).closest('#CartDrawer').length) {
        const cartMedia = $(parent).closest('[class*="cart"][class*="media"]');
        if (cartMedia.length && $(cartMedia).find('img:not(.bss_pl_img)').length && !$(cartMedia).find('.bss_pl_img').length) {
            $(cartMedia).find('img:not(.bss_pl_img)').parent().prepend(htmlLabel)
            appended = true;
        }
    }

    return appended;
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/getConfigRunScript/getProductInfo.js




//Comparer Priority Function
function getProductInfo_GetSortOrder(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

function getProductInfo($, url, page, handleProductPage, checkLanguageLabel) {
    var dataRes = BSS_PL.configData;
    // sort priority
    dataRes.sort(getProductInfo_GetSortOrder("priority"));
    // check label base on language integrate with langify app (only for five and ten USD plan)
    if (BSS_PL.currentPlan && BSS_PL.currentPlan !== 'free') {
        dataRes = dataRes.filter(checkLanguageLabel);
    }
    var dataResLabel = dataRes.filter((item) => {
        return item.label_type == 1 || item.label_type == null;
    });
    //badge type 0 is bellow name, 1 is bellow product image, 2 is bellow custom selector, 3 is bellow product price
    var dataResBadgeName = dataRes.filter((item) => {
        return item.label_type == 2 && item.badge_type == 0
    });
    var dataResBadgeProductImage = dataRes.filter((item) => {
        return item.label_type == 2 && item.badge_type == 1
    });
    var dataResBadgeCustomSelector = dataRes.filter((item) => {
        return item.label_type == 2 && item.badge_type == 2
    });
    var dataResBadgePrice = dataRes.filter((item) => {
        return item.label_type == 2 && item.badge_type == 3
    });
    var dataResBadgeAddToCart = dataRes.filter((item) => {
        return item.label_type == 2 && item.badge_type == 4
    });
    var dataResBadgeQuantityBox = dataRes.filter((item) => {
        return item.label_type == 2 && item.badge_type == 5
    });
    var dataResBadgeBuyItNow = dataRes.filter((item) => {
        return item.label_type == 2 && item.badge_type == 6
    });
    const checkBadgeStyle = () => {
        if ($('.bss_pb_img').length) {
            let bssBadges = $('.bss_pb_img');
            $.each(bssBadges, function (index, badge) {
                $(badge).css('visibility', 'hidden');
                if ($(badge).css('position') !== 'relative') {
                    $(badge).css('position', 'relative');
                }

                // fix customize for watchrapport
                if ($(badge).prev('.product-item__price-list.price-list').length && BSS_PL.storeId == 5112) {
                    if ($(badge).find('.bss-pb-frontend').length) {
                        $(badge).find('.bss-pb-frontend').css('position', 'relative');
                    }
                }
                setTimeout(function () {
                    let height = 0;
                    if ($(badge).find('.bss-pb-frontend').length) {
                        $.each($(badge).find('.bss-pb-frontend'), function (index, badgeItem) {
                            let $badgeItem = $(badgeItem);
                            height = $badgeItem.height();
                            // For badge stock
                            if ($badgeItem.hasClass("bss-pb-stock")) {
                                height = $badgeItem.outerHeight();
                            }
                            let badgeMarginTop = $badgeItem.css('margin-top');
                            height = parseInt(height) + parseInt(badgeMarginTop);

                            if (parseInt($(badge).height()) < height) {
                                $(badge).height(height + 'px');

                            }
                            $(badge).addClass('badge-visibility-important')
                            if ($(badge).css('min-height') !== '25px') {
                                $(badge).css('min-height', '25px');
                            }

                        })
                    }
                    if ($(badge).prev().hasClass('bss_pb_img')) {
                        $(badge).css('margin-top', '5px');
                    }
                }, 700)
            });
        }
    }
    var prodData = {
        baseImgUrl: bssPlApiServer + '/images/' + BSS_PL.storeId + '/240/'
    };
    var mainProduct = '';

    function handleData(data) {
        var responseProducts = [];
        var responseProductsMetaFieldsHidden = document.querySelectorAll('#label-product-metafields-info');
        var responseMainProductsMetaFieldsHidden = document.querySelectorAll('#main-label-product-metafields-info')
        try {
            responseProducts = JSON.parse(data);
            //fix emile-et-rose-retail by vitu - SAPL-410
            responseProducts = responseProducts.filter(i => (i.price !== null && i.available !== null))
            if (responseProductsMetaFieldsHidden.length) {
                for (let i = 0; i < responseProductsMetaFieldsHidden.length; i++) {
                    responseProducts.push(JSON.parse(responseProductsMetaFieldsHidden[i].innerText));
                }
            }
            if (responseMainProductsMetaFieldsHidden.length) {
                for (let i = 0; i < responseMainProductsMetaFieldsHidden.length; i++) {
                    responseProducts.push(JSON.parse(responseMainProductsMetaFieldsHidden[i].innerText));
                }
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('product label: JSON parse returns no item')
        }
        if (responseProducts.length) {
            if (page == 'products') {
                var allImages = $(
                    'img[srcset*="/products/"][srcset*="/cdn.shopify.com/s/files/"],' + // eslint-disable-line
                    'img[src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"],' + // eslint-disable-line
                    'img[srcset*="/products/"][srcset*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".jp\"],' + // eslint-disable-line
                    'img[srcset*="/products/"][srcset*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".JP\"],' + // eslint-disable-line
                    'img[srcset*="/products/"][srcset*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".png\"],' + // eslint-disable-line
                    'img[srcset*="/products/"][srcset*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".PNG\"],' + // eslint-disable-line
                    'img[data-src*="/products/"][data-src*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".jp\"],' + // eslint-disable-line
                    'img[data-src*="/products/"][data-src*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".JP\"],' + // eslint-disable-line
                    'img[data-src*="/products/"][data-src*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".png\"],' + // eslint-disable-line
                    'img[data-src*="/products/"][data-src*="/cdn.shopify.com/s/files/"][src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"][src*=\".PNG\"],' + // eslint-disable-line
                    'img[srcset*="cdn.shopify.com"][src*="no-image"],' + // eslint-disable-line
                    'img[src*="cdn.shopify.com"][src*="no-image"],' + // eslint-disable-line
                    'img[srcset*="cdn.shopify.com"][srcset*="/files/"],' + // eslint-disable-line
                    'img[src*="cdn.shopify.com"][src*="/files/"],' + // eslint-disable-line
                    'img[srcset*="cdn/shop/files/"],' + // eslint-disable-line
                    'img[src*="cdn/shop/files/"],' + // eslint-disable-line
                    'img[src*="cdn/shop/products/"],' + // eslint-disable-line
                    '.swiper-lazy[src*=\"/products/\"][src*=\"/cdn.shopify.com/s/files/\"],.engoj_img_main[src*="/products/"][src*="/cdn.shopify.com/s/files/"],' + // eslint-disable-line
                    '.single_product__img img[src*="/cdn.shopify.com/s/files/"],' +
                    '[data-pf-type="MasterImage"] img[src*="/cdn.shopify.com/s/files/"],' +
                    '.c-slide-product__wrap-image.slick-slide .c-slide-product__image[src*="/cdn.shopify.com/s/files/"],' +
                    '#ProductPhotoImg[src*="/cdn.shopify.com/s/files/"],' +
                    '.zoom-product[data-zoom-image][src*="/cdn.shopify.com/s/files/"],' +
                    '.fotorama__img[src*="/cdn.shopify.com/s/files/"],' +
                    '.product-big-image img[src*="/cdn.shopify.com/s/files/"],' +
                    '#bigimage img.mainimage[src*="/cdn.shopify.com/s/files/"],' +
                    '#mob-product-images .mthumb img[src*="/cdn.shopify.com/s/files/"],' +
                    'img.FeaturedImage-product-template.product-featured-img[src*="/cdn.shopify.com/s/files/"],' +
                    '.position-relative div[data-zoom-images*="/cdn.shopify.com/s/files/"],' +
                    'img.image-zoom[src*=\"/cdn.shopify.com/s/files/\"],' + // eslint-disable-line
                    '.slick-slide.slick-current.slick-active img[src*="/cdn.shopify.com/s/files/"],' +
                    '.detail-content-inner .detail-content .info-detail-pro #product-image img[src*="/cdn.shopify.com/s/files/"],' +
                    '.product-single__photos .slideshow__image[data-bgset*="/cdn.shopify.com/s/files/"],' +
                    '.op_0.dn[src*="data:image/gif;base64"],' +
                    'img.Image--fadeIn.lazyautosizes.Image--lazyLoaded[data-original-src*="/cdn.shopify.com/s/files/"],' +
                    'img.Image--lazyLoad.Image--fadeIn[data-original-src*="/cdn.shopify.com/s/files/"],' +
                    'img[data-zoom-src*="/cdn.shopify.com/s/files/"][src*="/cdn.shopify.com/s/files/"],' +
                    'img.lazyautosizes.lazyloaded[data-srcset*="/cdn.shopify.com/s/files/"],' +
                    '.product-photo-container img#product-featured-image[src*="/cdn.shopify.com/s/files/"],' +
                    'img.zoom-product[src*="/cdn.shopify.com/s/files/"],' + 'img[itemprop*="image"][src*="/cdn.shopify.com/s/files/"],' + 'img.zoomImg[src*="/cdn.shopify.com/s/files/"],' +
                    '.product-image .product-single__media.product-single__media--image[data-bgset*="/cdn.shopify.com/s/files/"],' +
                    '.product-layout-images .product-image--single[data-bgset*="/cdn.shopify.com/s/files/"],' +
                    '.product-swiper-img-height.swiper-slide-active[style*="background-image"],' +
                    '.product-layout-images .product-image[data-bgset*="/cdn.shopify.com/s/files/"],' +
                    '.gt_product-img-box img.gt_product-image--feature[src*="//cdn.shopify.com/s/files/"],' +
                    '.zoomContainer div.zoomWindow[style*="background-image"],' +
                    'img.gf_product-image-thumb[src*="//cdn.shopify.com/s/files/"], ' +
                    '.main-product-image img[src*="//cdn.shopify.com/s/files/"], ' +
                    '.product-image-wrapper img[src*="//cdn.shopify.com/s/files/"], ' +
                    '.product-single__photo-wrapper img.product-single__photo, ' +
                    '.owl-item img.lazyautosizes.lazyloaded[src*="//cdn.shopify.com/s/files/"],' +
                    'img.gt_product-image--feature.gt_lazyload.gt_lazyloaded[src*="//cdn.shopify.com/s/files/"],' +
                    'img.lazyload--mirage.lazyautosizes.lazyloaded[data-srcset*="/cdn.shopify.com/s/files/"][data-sizes="auto"],' +
                    'img.gt_active.gt_lazyload[src*="//cdn.shopify.com/s/files/"],' +
                    'img.rimage__image.fade-in.lazyautosizes[data-srcset*="/cdn.shopify.com/s/files/"],' +
                    '.product-photo-container img[src*="//cdn.shopify.com/s/files/"],' +
                    '.product__image.lazyload.lazyload-fade img[data-src*="/cdn.shopify.com/s/files/"],' +
                    '.product_slider img.featured_image[src*="//cdn.shopify.com/s/files/"],' +
                    '.flickity-viewport .flickity-slider .img_ptw,' +
                    '.product__image[style*="//cdn.shopify.com/s/files/"],' +
                    'div.product-single__photo.js-zoom-enabled, ' +
                    'div.swiper-slide img.product-featured-media[srcset*="//cdn.shopify.com/s/files/"],' +
                    'img.rondell-item-image.rondell-item-resizeable[src*="//cdn.shopify.com/s/files/"],' +
                    '.paira-single-product-image img.fotorama__img,' +
                    '.flickity-viewport img[src*="//cdn.shopify.com/s/files/"],' +
                    '.image-wrap img.photoswipe__image[srcset*="//cdn.shopify.com/s/files/"],' +
                    // fix for missamara by ThaBi
                    'img.bss-custom-img-product-page[src*="//cdn.shopify.com/s/files/"],' +
                    // fix for avenue85 by XuTho
                    'img.rimage__image.fade-in.lazyautosizes[data-srcset*="//cdn.shopify.com/s/files/"],' +
                    '.owl-wrapper-outer .image--container img.lazyautosizes.lazyloaded[data-srcset*="//cdn.shopify.com/s/files/"],' +
                    '.product-gallery__main_item .rimage img.rimage__img.donothide.entered.loaded.ls-is-cached.lazyloaded[data-master*="//cdn.shopify.com/s/files/"],' +
                    'img.rimage__img[data-master*="//cdn.shopify.com/s/files/"],' +
                    'img[src*="//cdn.accentuate.io"]:not(.kusaba_product-slider-thumbnail__img),' +
                    '.image__container img.lazyload--fade-in[data-src*="/cdn.shopify.com/s/files/"],' +
                    'button.product__media-toggle,' +
                    'img.lazyautosizes.lazyloaded,' +
                    'img.photoswipe__image.lazyload,' +
                    '.product__thumb-item div.image-wrap img,' +
                    //fix bug for samsaraluggage by tungnk
                    '.media-gallery__main .product-media--image,' +
                    //fix for alterreny by tungnk
                    '#bigimage .mainimage,' +
                    //fix for meermin by tungnk
                    '.product-gallery .product-gallery__featured-carousel .product-gallery__featured-image,' +
                    '.pg__mains .pg__main img,' +
                    '.product-gallery__media.snap-center.is-initial img'
                );

                // fix for raspberrycreekfabrics by thienpk
                if (BSS_PL.storeId == 19622) {
                    mainProduct = $('h2.product__title')
                }

                /** FIX SUPPORT BY STORE ID */
                if (typeof bssFixSupportAllImageElement == 'function') {
                    // eslint-disable-next-line
                    allImages = bssFixSupportAllImageElement($, page, allImages)
                }
                /** END FIX SUPPORT BY STORE ID */

                allImages.map(function (index, image) {
                    let customFlag = false
                    // fix odisri by vitu
                    if (($(image).closest('.site-header').length || $(image).closest('header').length || $(image).closest('[data-section-id="header"]').length && BSS_PL.storeId != 11867) && BSS_PL.storeId !== 17336) {
                        customFlag = true
                    }
                    // fix for zenmed - exclude label show on thumbnail & show wrong position on bottom block (madu)
                    else if ($(image).is('.secondary-media.lazyautosizes.lazyloaded') || $(image).closest('.collection-products').length) {
                        customFlag = true
                    }
                    else if (Shopify.theme.name.includes("Dawn") && $(image).closest(".section-featured-product").length) {
                        customFlag = true
                    }
                    //fix to not get the image of your label then data handle
                    else if ($(image).closest(".bss_pl_img").length && $(image).hasClass("bss-pl-frontend")) {
                        customFlag = true
                    }

                    /** FIX SUPPORT BY STORE ID */
                    if (typeof bssFixSupportMainProductImage == 'function') {
                        // eslint-disable-next-line
                        mainProduct = bssFixSupportMainProductImage($, image, mainProduct, handleProductPage, page)
                        customFlag = true
                    }
                    /** END FIX SUPPORT BY STORE ID */

                    if (!customFlag) {
                        $(image).parent().attr('data-handle', handleProductPage);
                        if (mainProduct == '') {
                            mainProduct = $(image).parent();
                        }
                    }
                });
            }

            responseProducts.map(function (item) {
                prodData['collects'] = item.collections;

                var itemHandle = item.handle;

                if (encodeURI(itemHandle) != itemHandle) {
                    itemHandle = encodeURI(itemHandle);
                }

                /** FIX SUPPORT BY STORE ID */
                if (typeof bssFixSupportDecodeItemHandle == 'function') {
                    // eslint-disable-next-line
                    itemHandle = bssFixSupportDecodeItemHandle($, page, itemHandle)
                }
                /** END FIX SUPPORT BY STORE ID */

                //fix for https://www.gettltd.com/ by hoaduong
                if (page == '' && BSS_PL.storeId == 17768) {
                    let id = item.id
                    var allParent = $(
                        `div[id*="ProductSection-${id}"]`
                    );
                    allParent.map(function (index, image) {
                        $(image).find('.product-block--header').attr('data-handle', itemHandle);
                    });
                }

                var parents = $('[data-handle="' + itemHandle + '"]:not(".meganav__product"):not([class$="autoketing"])');

                //fix label compatible with Beae - Pgage builder by tungnk
                if (window.location.href.includes('/pages') && $('.beae-builder') && $('.beae-builder').length) {
                    let formHasDataHandle = $('.beae-product-form.beae-product-form--single');
                    let formDataHandle = $('.beae-product-form.beae-product-form--single').attr('data-handle');
                    $(formHasDataHandle).find('.beae-product-single__media--featured img.beae-image-default').parent().attr('data-handle', formDataHandle)
                    let parents1 = $('[data-handle="' + formDataHandle + '"]');
                    let parents2 = $('[data-handle="' + itemHandle + '"]');
                    parents = [...parents1, ...parents2]
                }
                // HuyNT fix code compatible theme dawn 6.0.2
                else if (Shopify && Shopify.theme && Shopify.theme.name && Shopify.theme.name.indexOf("Dawn") !== -1) {
                    parents = $('[data-handle="' + itemHandle + '"]:not(".product__modal-opener")');
                }

                /** FIX SUPPORT BY STORE ID */
                if (typeof bssFixSupportProductParent == 'function') {
                    // eslint-disable-next-line
                    parents = bssFixSupportProductParent($, page, parents, itemHandle)
                }
                /** END FIX SUPPORT BY STORE ID */

                var firstParent = parents[0];
                var foundFirstImage = false;

                // skip first parent in free themes or some themes has similar class feature product
                if ($(firstParent).hasClass('product__info-container') && page !== "products") {
                    firstParent = '';
                }

                function initForLabel(dataRes) {
                    let appended = false;
                    let labeledParent = new Map();
                    $.each(parents, function (index, parent) {
                        if (window.location.pathname.includes("/cart") && !$(parent).closest('.featured-product').length && !$(parent).closest('.card-wrapper').length) {
                            let idVariant = (dataRes[0].variant).split(",");
                            let cartItem;
                            if($(parent).closest(".cart-item").length){
                                cartItem = $(parent).closest(".cart-item");
                            }
                            else if($(parent).closest(".cart__row").length){
                                cartItem = $(parent).closest(".cart__row");
                            }
                            else if($(parent).closest(".cart-page__item").length){
                                cartItem = (parent).closest(".cart-page__item");
                            }
                            else if($(parent).closest('.cart-row').length){
                                cartItem = $(parent).closest('.cart-row')
                            }
                            else if($(parent).closest('.cart__table-row').length){
                                cartItem = $(parent).closest('.cart__table-row')
                            }
                            else if($(parent).closest(".ajax-cart__item-image__wrapper").length){
                                cartItem = $(parent).closest(".ajax-cart__item-image__wrapper")
                            }
                            else {
                                cartItem = $(parent).closest(".line-item");
                            }
                            let href = cartItem.find('a[href*="variant"]');
                            if(href.length){
                                let url = $(href[0]).attr('href').split('=');
                                let variantValue = url[1];
                                if (idVariant.includes(variantValue)) {
                                    parent.setAttribute("id-variant", variantValue)
                                }
                            }
                        }
                        if (!$(parent).find('.bss_pl_img').length) {
                            // fix for dermalhealth by XuTho
                            if (BSS_PL.storeId == 4245 && page == "products") {
                                let inputValueVariantId = $('[data-pf-type=ProductVariantSwatches] input[type=hidden]');
                                let variantIdFirstLoad = $('[data-pf-type=ProductVariantSwatches] input[type=hidden]').attr('value');
                                if (inputValueVariantId && inputValueVariantId.closest('form[action="/cart/add"]').find('[data-handle]').find('img')) {
                                    inputValueVariantId.closest('form[action="/cart/add"]').find('[data-handle]').find('img').attr('bss-product-label-variant', variantIdFirstLoad)
                                }
                            }
                            var htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent, labeledParent);
                            var htmlLabel = `<div class="bss_pl_img" style="display: block !important;">${htmlList.length ? htmlList.join('') : ''}`


                            // fix for booriuk by Tiendvd
                            if (BSS_PL.storeId == 36360) {
                                if ($(parent).find(".t4s-product-img img[loading='lazy']").length) {
                                    let lazyImg = $(parent).find(".t4s-product-img img[loading='lazy']")[0];
                                    lazyImg.addEventListener("load", () => {
                                        htmlList = getImageList_getImageList($, BSS_PL, dataRes, item, prodData, parent, labeledParent);
                                        htmlLabel = `<div class="bss_pl_img" style="display: block !important;">${htmlList.length ? htmlList.join('') : ''}`
                                        $(parent).find(".bss_pl_img").remove();
                                        $(parent).prepend(htmlLabel);
                                    });
                                }
                            }

                            if (htmlList.length && !foundFirstImage) {
                                if (typeof bssFixSupportAppendHtmlLabel == 'function') {
                                    // eslint-disable-next-line
                                    appended = bssFixSupportAppendHtmlLabel($, BSS_PL, parent, page, htmlLabel);
                                } else {
                                    appended = false
                                }
                                if (!appended) {
                                    appended = fixBugGlobal($, BSS_PL, parent, page, htmlLabel);
                                }
                            }
                        }
                    });

                    // fix for sophiecrown by ThaBi
                    if (BSS_PL.storeId == 2518 && page == 'products' && $(firstParent).hasClass('AspectRatio')) {
                        // do nothing
                    }
                    // If not found any product image
                    else {
                        addToFirstParent($, appended, dataRes, item, prodData, firstParent, page);
                    }

                }

                if (dataResLabel.length) {
                    initForLabel(dataResLabel);
                }
                if (dataResBadgeProductImage.length) {
                    BSS_PL.initForBadgeProductImage($, BSS_PL, dataResBadgeProductImage, parents, item, prodData, foundFirstImage, page, firstParent);
                }
                if (dataResBadgeName.length) {
                    BSS_PL.initForBadgeProductName($, BSS_PL, dataResBadgeName, parents, item, prodData, foundFirstImage, page, firstParent);
                }
                if (dataResBadgePrice.length) {
                    BSS_PL.initForBadgePrice($, BSS_PL, dataResBadgePrice, parents, item, prodData, foundFirstImage, page, firstParent);
                }
                if (dataResBadgeCustomSelector.length) {
                    BSS_PL.initForBadgeCustomSelector($, BSS_PL, dataResBadgeCustomSelector, parents, item, prodData, foundFirstImage, page, firstParent, mainProduct);
                }
                if (dataResBadgeAddToCart.length) {
                    BSS_PL.initForBadgeAddToCartBtn($, BSS_PL, dataResBadgeAddToCart, parents, item, prodData, foundFirstImage, page, firstParent);
                }
                if (dataResBadgeQuantityBox.length) {
                    BSS_PL.initForBadgeQuantityBox($, BSS_PL, dataResBadgeQuantityBox, parents, item, prodData, foundFirstImage, page, firstParent);
                }
                if (dataResBadgeBuyItNow.length) {
                    BSS_PL.initForBadgeBuyItNowBtn($, BSS_PL, dataResBadgeBuyItNow, parents, item, prodData, foundFirstImage, page, firstParent);
                }
                checkBadgeStyle();

                const ArrayLabels = document.querySelectorAll('.bss_parent_text');

                ArrayLabels.forEach((label) => {
                    const computedStyles = window.getComputedStyle(label);
                    if (computedStyles.getPropertyValue('filter').includes('drop-shadow')) {
                        let parent = label.parentNode;
                        if (parent.classList.contains('bss_pb_img')) {
                            parent.parentNode.parentNode.style.overflow = 'hidden';
                        } else {
                            if (window.location.pathname.includes('/cart')) {
                                parent.parentNode.style.clipPath = "inset(0)"
                            } else {
                                parent.parentNode.style.overflow = 'hidden';
                            }
                        }

                    }
                });
            });
        }
    }

    // fix compatitive with jquery version "lim" (don't support ajax call)
    if (BSS_PL.storeId === 4363 || BSS_PL.storeId === 33730 || BSS_PL.storeId === 34803) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onreadystatechange = () => {
            // In local files, status is 0 upon success in Mozilla Firefox
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const status = xhr.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                    // The request has been completed successfully
                    handleData(xhr.responseText);
                }
            }
        };
        xhr.send()
    } else {
        $.get(url, handleData);
    }
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/getConfigRunScript/addDataHandle.js



function addDataHandle($, BSS_PL, listItems, checkLanguageLabel, firstLoadProduct) {
    var handles = [];
    var handlesUrl = [];
    var pathName = window.location.pathname;
    if (pathName.endsWith('/')) {
        pathName = pathName.slice(0, -1);
    }
    var path = pathName.split('/');
    var handleProductPage = path[path.length - 1];
    var page = path[path.length - 2];
    if (path.length == 1) {
        page = "";
    }
    // fix for solventdirect by HoanPV
    if (BSS_PL.storeId == 22358 || BSS_PL.storeId == 20163) {
        handleProductPage = decodeURI(handleProductPage);
    }
    if (listItems.length) {
        listItems.each(function (index, item) {
            var checkExcludedItem = excludeItem($, BSS_PL, page, item);
            // fix for ForJuggyusa by vitu
            if (checkExcludedItem && !(BSS_PL.storeId == 12552 && window.location.pathname.includes('/apps/bundles'))) {
                return;
            }
            if (BSS_PL.storeId == 21614 && ($(item).parent().hasClass('boost-pfs-search-suggestion-item') || $(item).closest('.left-banner').length)) {
                return;
            }
            $(item).attr('data-bss-pl', 'active');
            if ($(item).closest('#slidecarthq').length || $(item).closest('#CartContainer').length ||
                $(item).closest('.social-sharing').length) {
                return;
            }

            /** FIX SUPPORT BY STORE ID */
            if (typeof bssFixSupportProductItemEle == 'function') {
                // eslint-disable-next-line
                item = bssFixSupportProductItemEle($, page, item)
            }

            var prodUrl = $(item).attr('href')
            if (typeof bssFixSupportProductUrl == 'function') {
                // eslint-disable-next-line
                prodUrl = bssFixSupportProductUrl($, BSS_PL, page, prodUrl, item)
            }
            /** END FIX SUPPORT BY STORE ID */

            var handle = BSS_PL.getHandleByUrl(prodUrl)

            if ($(item).hasClass('product__media-wrapper') || $(item).hasClass('product__image-wrapper')) {
                // Fix for product page of Narrative theme
                let productSectionItem = $(item).parent();
                if (productSectionItem.hasClass('product__media-container') || productSectionItem.hasClass('product__image-container')) {
                    if ($('#shopify-section-product-template').length) {
                        let itemUrl = $('#shopify-section-product-template').find("meta[itemprop='url']").attr('content');
                        handle = BSS_PL.getHandleByUrl(itemUrl);
                    }
                }
            }
            if ($(item).hasClass('product-image__link') && $(item).find('.product-media-wrapper').length && $('#shopify-section-product-template').length) {
                handle = handleProductPage;
            }
            // Fix for naturalid product page
            if ($(item).hasClass('nt-pr_metro-image-equal')) {
                handle = handleProductPage;
            }
            if ($(item).hasClass('product__thumb') && $('#shopify-section-product-template').length) {
                handle = handleProductPage;
            }
            if ($(item).hasClass('product-single__photo-zoom') && $('.section--product-single').length) {
                handle = handleProductPage;
            }
            if ($(item).hasClass('main-img-link') && $(item).parent().hasClass('product-media--image')) {
                handle = handleProductPage;
            }
            if ($(item).hasClass('js-modal-open-product-modal') && $('#shopify-section-product-template').length) {
                handle = handleProductPage;
            }
            if ($(item).hasClass('product-gallery__thumbnail') && $('.product-gallery__thumbnail-list').length) {
                handle = handleProductPage;
            }

            /** FIX SUPPORT BY STORE ID */
            if (typeof bssFixSupportItemHandle == 'function') {
                // eslint-disable-next-line
                handle = bssFixSupportItemHandle($, page, handle, handleProductPage, prodUrl, item)
            }
            /** END FIX SUPPORT BY STORE ID */

            if (handle) {
                if (handle.indexOf("#Reviews") !== -1) {
                    handle = handle.slice(0, handle.indexOf("#Reviews"))
                }
                if ($.inArray(handle, handles) == -1) {
                    handles.push(handle);
                    handlesUrl.push('handle:"' + decodeURIComponent(handle) + '"');
                }

                var isCartPage = false
                if (window.location.href.includes('/cart') && (!window.location.href.includes('/collections/') && !window.location.href.includes('/products/'))) {
                    isCartPage = true

                    if ($(item).hasClass('cart__image')) {
                        //fix label in cart page for theme Venture, Brooklyn
                        if ($(item).parent().hasClass('cart__cell--image') || $(item).parent().hasClass('grid__item')) {
                            var imgElement = $(item).parent().find('img');
                            $(imgElement).parent().css({
                                'position': 'relative',
                                'display': 'block'
                            }).attr('data-handle', handle);
                        }
                        else {
                            //Fix for https://madbutchermeat.com/
                            $(item).find(".rimage").attr('data-handle', handle);
                        }
                    } else {
                        //fix label in cart page for theme Simply, Minimal
                        if (($(item).hasClass('cart-image') && $(item).parent().hasClass('grid-item')) || ($(item).find('.cart__image-wrapper').length && $(item).parent().hasClass('grid__item'))) {
                            let imgElement = $(item).parent().find('img');
                            $(imgElement).parent().css({
                                'position': 'relative',
                                'display': 'block'
                            }).attr('data-handle', handle);
                        }
                        else {
                            if ($(item).closest('td').find('img').length) {
                                let imgElement = $(item).closest('td').find('img');
                                //fix for Narrative theme
                                if ($(item).hasClass('cart-item__image-link') && $(item).parent().hasClass('cart-item__image-wrapper')) {
                                    $(imgElement).parent().css({
                                        'position': 'relative'
                                    }).attr('data-handle', handle);
                                }
                                //fix for Express, Boundless, Debut theme
                                else if (($(item).hasClass('link-image') && $(item).parent().hasClass('cart__table-cell') || ($(item).find('.cart__image').length && $(item).parent().hasClass('cart__table-cell--image'))) || ($(item).hasClass('cart__product-title') && $(item).parent().hasClass('list-view-item__title'))) {
                                    $(imgElement).parent().css({
                                        'position': 'relative',
                                        'display': 'block'
                                    }).attr('data-handle', handle);
                                }
                                else {
                                    $(imgElement).parent().css({
                                        'position': 'relative'
                                    }).attr('data-handle', handle);
                                }
                            }
                            else if ($(item).closest('.featured-product').find('img').length) {
                                let parent = $(item).closest('.featured-product').find('product-info')
                                $(parent).attr('data-handle', handle)
                            }
                            else {
                                $(item).parent().attr('data-handle', handle)
                            }

                            /** FIX SUPPORT BY STORE ID */
                            if (typeof bssFixSupportItemHandle == 'function') {
                                // eslint-disable-next-line
                                handle = bssFixSupportItemHandle($, page, handle, handleProductPage, prodUrl, item, isCartPage)
                            }
                            /** END FIX SUPPORT BY STORE ID */
                        }
                    }
                } else {
                    if ($(item).hasClass('list-view-item') && $(item).find('.list-view-item__image-wrapper').length) {
                        $(item).find('.list-view-item__image-wrapper').attr('data-handle', handle);
                    } else if ($(item).hasClass('grid-link') && $(item).find('.product__img-wrapper').length) {
                        // Fix for collection products of minimal theme
                        $(item).find('.product__img-wrapper').attr('data-handle', handle);
                    } else if ($(item).hasClass('grid-link') && $(item).parent().hasClass('product-container')) {
                        $(item).parent().attr('data-handle', handle);
                    } else if ($(item).hasClass('product__thumb')) {
                        if (
                            $('#shopify-section-product-template').length && $('#shopify-section-product-template').find('.product__main-photos').length
                        ) {
                            $('#shopify-section-product-template').find('.product__main-photos').attr('data-handle', handle);
                        }
                    } else if ($(item).hasClass("ls-p-url")) {
                        //fix for www.gorg.co.in
                        $(item).find(".ls-p-img-div").attr('data-handle', handle);
                    } else if (($(item).closest('.card-wrapper').length)) {
                        $(item).parent().attr('data-handle', handle);
                        $(item).closest('.card-wrapper').find('.card__inner').attr('data-handle', handle)
                    } else {
                        /** FIX SUPPORT BY STORE ID */
                        if (typeof bssFixSupportItemHandle == 'function') {
                            // eslint-disable-next-line
                            handle = bssFixSupportItemHandle($, page, handle, handleProductPage, prodUrl, item, isCartPage)
                        }
                        /** END FIX SUPPORT BY STORE ID */

                        // fix rapid-search-staging by vitu
                        if (window.location.pathname.includes('/rapid-search-results')) {
                            if ($(item).find('.rps-product-image-container').length) {
                                $(item).find('.rps-product-image-container').attr('data-handle', handle);
                            }
                        }

                        //fix alfa by thienpk
                        else if (!(BSS_PL.storeId == 21201 && page == "collections")) {
                            $(item).parent().attr('data-handle', handle);
                        }
                    }
                }
            }
        });
    }

    // fix SAPL-1594 and by vitu
    // fix inglotbenelux 20031 by thienpk
    // fix coffeesweat 23934 by thienpk
    // fix alfa 21201 by thienpk
    // fix burleighwagon 25034 by HoangPN
    var storeIdDefaultFirstLoadProduct = [18606, 20401, 20929, 20031, 23934, 21201, 25034]
    if ((storeIdDefaultFirstLoadProduct.indexOf(BSS_PL.storeId) !== -1)) {
        firstLoadProduct = true;
    }

    if (page == 'products' && $.inArray(handleProductPage, handles) == -1 && firstLoadProduct) {
        handles.push(handleProductPage);
        handlesUrl.push('handle:"' + decodeURIComponent(handleProductPage) + '"');
    }
    //fix label compatible with Beae - Pgage builder by tungnk
    if (window.location.pathname.includes("/pages") && $(".beae-builder") && $(".beae-builder").length) {
        let handle = $(".beae-product-form").attr("data-handle")
        handles.push(handle);
        handlesUrl.push('handle:"' + handle + '"');
    }

    if ($('.index-section--featured-product:not([data-bss-pl=active])').length) {
        $('.index-section--featured-product:not([data-bss-pl=active])').each(function () {
            $(this).attr('data-bss-pl', 'active');
            var sectionId = $(this).children(':first').attr('data-section-id');
            if (sectionId) {
                var prodSection = false;
                if ($('#ProductJson-' + sectionId).length) {
                    prodSection = JSON.parse($('#ProductJson-' + sectionId).html());
                } else if ($(this).find("script").length) {
                    //Fix get json data of featured product for Narrative theme
                    if ($(this).find("script").attr('type') === "application/json") {
                        try {
                            prodSection = JSON.parse($(this).find("script").html());
                        } catch (e) {
                            // eslint-disable-next-line no-console
                            console.log("Not found featured product JSON data")
                        }
                    }
                }

                if (prodSection) {
                    if ($.inArray(prodSection.handle, handles) == -1) {
                        handles.push(prodSection.handle);
                        handlesUrl.push('handle:"' + decodeURIComponent(prodSection.handle) + '"');
                    }
                    if ($(this).find('.product__photo.featured-product__photo').length) {
                        $(this).find('.product__photo.featured-product__photo').attr('data-handle', prodSection.handle);
                    } else if ($(this).find('.product-single__media').length) {
                        $(this).find('.product-single__media').attr('data-handle', prodSection.handle);
                    } else if ($(this).find('.product-media--featured-product').length) {
                        // For Narrative theme
                        $(this).find('.product-media--featured-product').attr('data-handle', prodSection.handle);
                    } else if ($(this).find('.product-single__photo-wrapper').length) {
                        // Fix for paintingplanet home page
                        $(this).find('.product-single__photo-wrapper').attr('data-handle', prodSection.handle);
                    } else {
                        $(this).find('img.product-featured-img').closest('.product-single__photo').attr('data-handle', prodSection.handle);
                    }
                }
            }
        });
    } else if ($('#shopify-section-featured-product:not([data-bss-pl=active])').length) {
        // Fix bugs: Labels don't show on featured product at brooklyn theme, Express theme
        $('#shopify-section-featured-product:not([data-bss-pl=active])').each(function () {
            $(this).attr('data-bss-pl', 'active');
            var sectionId = $(this).children(':first').attr('data-section-id');
            if (sectionId) {
                var prodSection = false;
                if ($("#ProductJson-" + sectionId).length) {
                    prodSection = JSON.parse($('#ProductJson-' + sectionId).html());
                } else if ($(this).find("script").length) {
                    //Fix for featured product on home page of Express Theme
                    if ($(this).find("script").attr('type') === "application/ld+json") {
                        prodSection = JSON.parse($(this).find("script").html());
                        let splitUrlBySplash = prodSection.url.split("/");
                        prodSection.handle = splitUrlBySplash[splitUrlBySplash.length - 1];
                    }
                }

                if (prodSection) {
                    if ($.inArray(prodSection.handle, handles) == -1) {
                        handles.push(prodSection.handle);
                        handlesUrl.push('handle:"' + decodeURIComponent(prodSection.handle) + '"');
                    }
                    if ($(this).find('.product-single__media').length) {
                        $(this).find('.product-single__media').attr('data-handle', prodSection.handle);
                    } else if ($(this).find('.product__media-wrapper .product__gallery').length) {
                        //Fix for featured product on home page of Express Theme
                        $(this).find('.product__media-wrapper .product__gallery').attr('data-handle', prodSection.handle);
                    } else if ($(this).find('.product__photo.featured-product__photo').length) {
                        $(this).find('.product__photo.featured-product__photo').attr('data-handle', prodSection.handle);
                    } else {
                        $(this).find('img.product-featured-img').closest('.product-single__photo').attr('data-handle', prodSection.handle);
                    }
                }
            }
        });
        // fix for  Express theme not show on all feature product
        if ($('#shopify-section-featured-product').parent().find('.shopify-section:not([data-bss-pl=active]) section.product').length) {
            // Fix bugs: Labels don't show on featured product at brooklyn theme, Express theme
            $('#shopify-section-featured-product').parent().find('.shopify-section:not([data-bss-pl=active])').each(function () {
                $(this).attr('data-bss-pl', 'active');
                var sectionId = $(this).children(':first').attr('data-section-id');
                if (sectionId) {
                    var prodSection = false;
                    if ($("#ProductJson-" + sectionId).length) {
                        prodSection = JSON.parse($('#ProductJson-' + sectionId).html());
                    } else if ($(this).find("script").length) {
                        //Fix for featured product on home page of Express Theme
                        if ($(this).find("script").attr('type') === "application/ld+json") {
                            prodSection = JSON.parse($(this).find("script").html());
                            let splitUrlBySplash = prodSection.url.split("/");
                            prodSection.handle = splitUrlBySplash[splitUrlBySplash.length - 1];
                        }
                    }

                    if (prodSection) {
                        if ($.inArray(prodSection.handle, handles) == -1) {
                            handles.push(prodSection.handle);
                            handlesUrl.push('handle:"' + decodeURIComponent(prodSection.handle) + '"');
                        }
                        if ($(this).find('.product-single__media').length) {
                            $(this).find('.product-single__media').attr('data-handle', prodSection.handle);
                        } else if ($(this).find('.product__media-wrapper .product__gallery').length) {
                            //Fix for featured product on home page of Express Theme
                            $(this).find('.product__media-wrapper .product__gallery').attr('data-handle', prodSection.handle);
                        } else if ($(this).find('.product__photo.featured-product__photo').length) {
                            $(this).find('.product__photo.featured-product__photo').attr('data-handle', prodSection.handle);
                        } else {
                            $(this).find('img.product-featured-img').closest('.product-single__photo').attr('data-handle', prodSection.handle);
                        }
                    }
                }
            });
        }
    }

    if (handles.length) {
        var urlData = '/search.js?q=' + handlesUrl.join(' OR ') + '&view=bss.product.labels';
        var encodeUrlData = encodeURI(urlData);
        if (BSS_PL.storeId == 31321) {
            encodeUrlData = urlData;
        }
        var splitIndex = Math.round(handlesUrl.length / 2);
        var max = handlesUrl.length

        encodeUrlData = encodeUrlData.replace(/#product-reviews/g, '');
        encodeUrlData = encodeUrlData.replace(/#judgeme_product_reviews/g, '');
        // fix case encodeUrlData too long for snackpangpang
        encodeUrlData = encodeUrlData.replace(/#content/g, '').replace(/#spetses-2/g, '');
        // fix case encodeUrlData redundant characters for houseofknives
        encodeUrlData = encodeUrlData.replace(/#/g, '');
        // array id store split data handle into many parts
        var arrayStoreId = [30182, 36790, 36569, 21669, 34803, 14623, 14178, 8473, 8645, 10772, 11377, 11741, 12501, 12870, 10504, 2502, 16882, 10783, 6526, 17356, 16574, 18524, 18849, 16297, 5267, 27444, 25415, 28833, 16288, 22707, 32295, 19829, 19352, 30622, 34074, 33929, 23876, 27178, 19917, 31053];

        // array id store split data handle into two parts
        var arrayStoreId2 = [36488, 26404, 2964, 5719, 4589, 14064, 30497, 22672, 32396, 9217]

        if (arrayStoreId2.indexOf(BSS_PL.storeId) !== -1) {
            var firstHalf = encodeURI('/search.js?q=' + handlesUrl.splice(splitIndex, max - splitIndex + 1).join(' OR ') + '&view=bss.product.labels')
            firstHalf = firstHalf.replace(/#product-reviews/g, '').replace(/#judgeme_product_reviews/g, '');
            var secondHalf = encodeURI('/search.js?q=' + handlesUrl.splice(0, max - splitIndex + 1).join(' OR ') + '&view=bss.product.labels')
            secondHalf = secondHalf.replace(/#product-reviews/g, '').replace(/#judgeme_product_reviews/g, '');

            getProductInfo($, firstHalf, page, handleProductPage, checkLanguageLabel)
            getProductInfo($, secondHalf, page, handleProductPage, checkLanguageLabel)
        }
        //fix label compatible with Beae - Pgage builder by tungnk
        else if (window.location.pathname.includes("/pages") && $(".beae-builder") && $(".beae-builder").length) {
            let firstHalf2 = encodeURI('/search.js?q=' + handlesUrl.splice(max - 1).join(' OR ') + '&view=bss.product.labels')
            firstHalf2 = firstHalf2.replace(/#product-reviews/g, '').replace(/#judgeme_product_reviews/g, '');
            let secondHalf2 = encodeURI('/search.js?q=' + handlesUrl.splice(0, max - 1).join(' OR ') + '&view=bss.product.labels')
            secondHalf2 = secondHalf2.replace(/#product-reviews/g, '').replace(/#judgeme_product_reviews/g, '');

            getProductInfo($, firstHalf2, page, handleProductPage, checkLanguageLabel)
            getProductInfo($, secondHalf2, page, handleProductPage, checkLanguageLabel)
        }
        // fix for glamraider (vitu)
        else if (arrayStoreId.indexOf(BSS_PL.storeId) !== -1) {
            let encodeUrlDataArr = []
            let half = BSS_PL.divideHandlesUrl(handlesUrl)
            if (BSS_PL.storeId == 28833 || BSS_PL.storeId == 23876 || BSS_PL.storeId == 31053 || BSS_PL.storeId == 30182) {
                let newHalf = []
                for (const element of half) {
                    let max = element.length
                    let splitIndex = Math.round(element.length / 2);
                    let firstHalfArr = element.splice(splitIndex, max - splitIndex + 1)
                    let secondHalfArr = element.splice(0, max - splitIndex + 1)
                    newHalf.push(firstHalfArr, secondHalfArr)
                }
                for (let i = 0; i < newHalf.length; i++) {
                    let firstHalf1 = encodeURI('/search.js?q=' + newHalf[i].join(' OR ') + '&view=bss.product.labels')
                    firstHalf1 = firstHalf1.replace(/#product-reviews/g, '').replace(/#judgeme_product_reviews/g, '')
                    encodeUrlDataArr.push(firstHalf1)
                }
            } else {
                for (let i = 0; i < half.length; i++) {
                    let firstHalf1 = encodeURI('/search.js?q=' + half[i].join(' OR ') + '&view=bss.product.labels')
                    firstHalf1 = firstHalf1.replace(/#product-reviews/g, '').replace(/#judgeme_product_reviews/g, '')
                    encodeUrlDataArr.push(firstHalf1)
                }
            }
            for (let i = 0; i < encodeUrlDataArr.length; i++) {
                getProductInfo($, encodeUrlDataArr[i], page, handleProductPage, checkLanguageLabel)
            }
        } else {
            getProductInfo($, encodeUrlData, page, handleProductPage, checkLanguageLabel)
        }

    }
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/getConfigRunScript/getTimeoutLoadFunction.js
function getTimeoutLoadFunction($, BSS_PL) {
    var path = window.location.pathname.split('/');
    var page = path[path.length - 2];
    let isHomePage = window.location.pathname == '/'
    let isProductPage = page == "products"
    let isCollOrSearchPage = page == "collections" || window.location.pathname == '/search' || window.location.pathname == '/pages/search-results-page' || window.location.pathname == '/pages/search-results' || page == 'pages'

    //default timeout
    var timeout = 200

    let timeoutStoreIds = {
        "allPage": {
            "0.5s": [10170, 3341, 11088],
            "1s": [5062, 20929, 15802, 1266, 35389, 13095, 32835, 21307, 1808, 2435, 14921, 7896, 9005, 22353, 24341, 22592, 16365, 21068, 25570, 25814, 17560, 20629, 28129, 28557, 25770, 28558, 6017, 29484, 29625, 4363, 25196, 24183],
            "1.5s": [10783],
            "2s": [16449, 32855, 2251, 33150, 9217, 35598, 27320, 19917, 21428, 17563, 10839, 9266, 10299, 25419, 19527, 17375, 34545, 20496, 33257, 34198, 15923, 33588, 19256, 14922, 31918, 7915, 25969, 7576, 24496, 22434, 9507, 13598, 21666, 5042, 22986, 23606, 20160, 20781, 9822, 10846, 25529, 9834, 25683, 31265, 22481, 24606, 25812, 26086, 24636, 10665, 25862, 26415, 5267, 6907, 26742, 17186, 21614, 27553, 28109, 28994, 29224, 28492, 25079, 13097, 19352, 27178, 28650, 30356, 27999, 26986, 29259, 30494, 30233, 17149, 30844, 31191, 23742, 32350, 28950, 5085, 32428, 32639, 24638, 22743, 32618, 19252, 32759, 16904, 32220, 33270, 33474, 33757, 14623, 9306, 13882, 35275],
            "2.5s": [35302, 22506, 9301, 11446, 21579, 21292, 23869, 25491, 22709, 27837, 30545, 30234],
            "3s": [34984, 34926, 31053, 11362, 5798, 21465, 22321, 20006, 22217, 22756, 13347, 15462, 15658, 12379, 24647, 21783, 22592, 11113, 25561, 22707, 8263, 26063, 27569, 28146, 28337, 29273, 8022, 16913, 33867],
            "4s": [32282],
            "5s": [21357, 9987],
        },
        "homePage": {
            "1s": [33946],
            "3s": [28915, 19375],
            "3.5s": [19922]
        },
        "productPage": {
            "0.3s": [10751],
            "1s": [35860, 35832, 34380, 7637, 15606, 7104, 9493, 15413, 13709, 22358, 23046, 36288 , 36666 , 36860],
            "1.5s": [35847, 6918, 13273, 5950, 15365, 12302, 10680, 11305, 16705, 19449, 19111, 20110, 22813],
            "2s": [19126, 3019, 7807, 10795, 5483, 9639, 4859, 15833, 9806, 19829, 2984, 13303, 20784, 20031, 25034, 23968, 20486, 29389, 21611, 36280, 36181],
            "3s": [25070, 13160, 24392, 11457, 17606, 16443, 15649, 10884, 23105, 20229, 23396, 15000, 24502, 29274, 11262],
            "3.5s": [18068],
            "4s": [11819, 11541, 22570, 24409],
            "5s": [14178, 20163],
            "5.5s": [25155]
        },
        "collSearchPage": {
            "0.5s": [11986, 18256, 12184, 10884],
            "1s": [36680, 11832, 7915, 11987, 3987, 21095, 14494, 1279, 5267, 9250],
            "1.5s": [16886, 10326],
            "2s": [13538, 13802, 12519, 4010, 18652, 11367, 11107, 22361],
            "2.5s": [13325],
            "3s": [7832, 9518, 8645, 9614, 9306, 19664, 22454, 17781],
            "3.5s": [12847],
            "5s": [11656]
        }
    }

    for (let key in timeoutStoreIds) {
        if (Object.prototype.hasOwnProperty.call(timeoutStoreIds, key)) {
            for (let timeoutKey in timeoutStoreIds[key]) {
                if (Object.prototype.hasOwnProperty.call(timeoutStoreIds[key], timeoutKey) && timeoutStoreIds[key][timeoutKey].includes(BSS_PL.storeId)) {
                    let flag = false
                    switch (key) {
                        case "allPage":
                            flag = true
                            break;
                        case "homePage":
                            flag = isHomePage
                            break;
                        case "productPage":
                            flag = isProductPage
                            break;
                        case "collSearchPage":
                            flag = isCollOrSearchPage
                            break;
                        default:
                            break;
                    }
                    if (flag) {
                        timeout = timeoutKey.split('s')[0] * 1000
                        break
                    }
                }
            }
        }
    }

    /** FIX SUPPORT BY STORE ID */
    if (typeof bssFixSupportTimeoutWithSpecificPage == 'function') {
        // eslint-disable-next-line
        timeout = bssFixSupportTimeoutWithSpecificPage($, BSS_PL, timeout, page)
    }
    /** END FIX SUPPORT BY STORE ID */

    return timeout;
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/label/addToFirstParentCollection.js
function addToFirstParentCollection($, appended, dataRes, item, prodData, firstParent, page) { // eslint-disable-line
    if (!appended) {

        var htmlLabel = '',
            htmlList = BSS_PL.getCollectionImageList(dataRes, item, prodData, firstParent);

        var isAllowInsert = !$(firstParent).hasClass('swatchProductColor') && !$(firstParent).hasClass('hero-content');
        if (htmlList.length && isAllowInsert) {

            // var isAbsoluteFirstParent = $(firstParent).css("position") == "absolute";
            // var isParentBelongToGallery = $(firstParent).hasClass('aspect-ratio') && $(firstParent).parent().hasClass('product-gallery__thumbnail');

            $(firstParent).css("position", "relative");
            htmlLabel += '<div class="bss_pl_img" style="display: block !important; padding-left: inherit; padding-top: inherit ; ">';
            htmlLabel += htmlList.join('');
            htmlLabel += '</div>';
            $(firstParent).prepend(htmlLabel);
        }
    }
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/label/fixBugForStoresCollection.js
function fixBugForStoresCollection($, BSS_PL, parent, page, htmlLabel) {
    let appended = false;
    if (BSS_PL.storeId == 11656) {
        if (window.location.pathname == '/collections' && $(parent).hasClass('grid__cell 1/2--tablet 1/3--lap-and-up')) {
            $(parent).find('.aspect-ratio').prepend(htmlLabel);
            appended = true;
        }
    }
    // fix for NUBON MARKET by SonPT
    else if (BSS_PL.storeId == 22523 && window.location.pathname == '/') {
        if ($(parent).hasClass('grid__item')) { 
            let parent2 = $(parent).find('a').first()
            $(parent2).prepend(htmlLabel);
            appended = true
        }
    }
    return appended ;
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/init/initCollectionLabel.js









function initCollectionLabel($, BSS_PL) {
    let checkPCScreen = $(window).width() > 768
    function GetSortOrder(prop) {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    BSS_PL.initCollections = function () {
        let listStoreDontHaveImg = [11656] ;
        var listItems = $('img:not([data-bss-pl=active]):not(.action-link)').closest("a");
        let listItemsForThemeFree = $('a[href*="/collections/"]:not([data-bss-pl=active]):not(.action-link):not(.header__menu-item)');
        // XuTho fix code compatible theme dawn 2.0 and Expess theme 1.0
        if (listStoreDontHaveImg.indexOf(BSS_PL.storeId) != -1 || Shopify && Shopify.theme && Shopify.theme.name.indexOf("Express") != -1) {
            listItems = listItemsForThemeFree
        }
        // get list items in free themes
        // get list items in free themes 2.0
        if (listItemsForThemeFree && listItemsForThemeFree.closest('.card__inner').find('.card__media').length) {
            listItems = listItemsForThemeFree.closest('.card__inner').find('.card__media');
        }
        // get list items in free themes 1.0
        // theme Expess
        else if (listItemsForThemeFree && listItemsForThemeFree.closest('.collection-list__item').find('.collection-list__image-wrapper').length) {
            listItems = listItemsForThemeFree.closest('.collection-list__item').find('.collection-list__image-wrapper');
        }
        // theme Debut
        else if (listItemsForThemeFree && listItemsForThemeFree.closest('.grid__item').find('.collection-grid-item__link').length) {
            listItems = listItemsForThemeFree.closest('.grid__item').find('.collection-grid-item__link');
        }

        BSS_PL.addLabelCollections(listItems);
    };

    BSS_PL.getHandleByUrlCollections = function (url) {
        if (url.indexOf('?') > 0) {
            url = url.substring(0, url.indexOf('?'));
        }
        var handle = ''
        if (url.indexOf('collections') > 0) {
            var path = url.split('/');
            handle = path.pop(-1);
        }
        return handle;
    }

    BSS_PL.addLabelCollections = function (listItems) {
        var handles = [];
        var pathName = window.location.pathname;
        if (pathName.endsWith('/')) {
            pathName = pathName.slice(0, -1);
        }
        var path = pathName.split('/');
        var page = path[path.length - 2];
        if (path.length == 1) {
            page = "";
        }

        if (listItems.length) {
            listItems.each(function (index, item) {
                var handle;
                $(item).attr('data-bss-pl', 'active');

                if ($(item).attr('href') && $(item).attr('href') != '#') {
                    handle = BSS_PL.getHandleByUrlCollections($(item).attr('href'));
                }
                // add data handle in free themes
                else if ($(item).parent().find('a[href*="/collections"]').attr('href') && $(item).parent().find('a[href*="/collections"]').attr('href') != '#') {
                    handle = BSS_PL.getHandleByUrlCollections($(item).parent().find('a[href*="/collections"]').attr('href'))
                }
                else {
                    handle = $(item).find('img').first().attr('alt');
                }
                if (handle) {
                    if ($.inArray(handle, handles) == -1) {
                        handles.push(handle);
                    }
                    // theme Minimal
                    if($(item) && $(item).find('.grid-link__image-centered').length) {
                        $(item).find('.grid-link__image-centered').attr('data-handle', handle);
                    }
                    // theme Supply
                    else if( $(item) && $(item).find('.featured-box--image .lazyload__image-wrapper').length) {
                        $(item).find('.featured-box--image .lazyload__image-wrapper').attr('data-handle', handle);
                    }
                    else if( $(item) && $(item).find('.featured-card__image-container').length) {
                        $(item).find('.featured-card__image-container').attr('data-handle', handle);
                    }
                    else {
                        $(item).parent().attr('data-handle', handle);
                    }
                }
            });
        }

        if (handles.length) {
            BSS_PL.getCollectionInfo(page)
        }
    }

    // eslint-disable-next-line
    BSS_PL.getCollectionInfo = function (page) {
        try {
            var dataRes = BSS_PL.configData;
            // sort priority
            dataRes.sort(GetSortOrder("priority"));

            var dataResLabel = dataRes.filter((item) => {
                return item.label_type == 1 || item.label_type == null;
            });

            var prodData = {
                baseImgUrl: bssPlApiServer + '/images/' + BSS_PL.storeId + '/240/'
            };
            if (BSS_PL.collectionID && BSS_PL.collectionHandle && BSS_PL.collectionTitle) {
                let ids = BSS_PL.collectionID.split(',');
                let handles = BSS_PL.collectionHandle.split(',');
                let titles = BSS_PL.collectionTitle.split(',');
                var responseProducts = [];
                for (let i = 0; i < ids.length; ++i) {
                    const collection = {
                        id: ids[i],
                        handle: handles[i],
                        title: titles[i],
                    }
                    responseProducts.push(collection)
                }
                if (responseProducts.length) {
                    responseProducts.map(function (item) {
                        prodData['collects'] = item.id;
                        // prodData['isInstock'] = item.variants[0].isInstock;

                        var itemHandle = item.handle;

                        if (encodeURI(itemHandle) != itemHandle) {
                            itemHandle = encodeURI(itemHandle);
                        }

                        var parents = $('[data-handle="' + itemHandle + '"]:not(".meganav__product"):not([class$="autoketing"])');
                        if (parents.length == 0) {
                            parents = $('[data-handle="' + item.title + '"]:not(".meganav__product"):not([class$="autoketing"])')
                        }
                        var foundFirstImage = false;

                        function initForLabel(dataRes) {

                            $.each(parents, function (index, parent) {
                                let appended = false;
                                if (!$(parent).find('.bss_pl_img').length) {

                                    var htmlLabel = '',
                                        htmlList = BSS_PL.getCollectionImageList(dataRes, item, prodData, parent);
                                    if (htmlList.length && !foundFirstImage) {
                                        htmlLabel += '<div class="bss_pl_img" style="display: block !important;">';
                                        htmlLabel += htmlList.join('');
                                        htmlLabel += '</div>';
                                        appended = fixBugForStoresCollection($, BSS_PL, parent, page, htmlLabel);
                                    }
                                    addToFirstParentCollection($, appended, dataRes, item, prodData, parent, page);
                                }
                            });
                        }
                        if (dataResLabel.length) {
                            initForLabel(dataResLabel);
                        }
                    });
                }
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(" Error in BSS_PL.getCollectionInfo : " , e )
        }
    }

    BSS_PL.getCollectionImageList = function (data, productItem, res, parent) {
        var prod = JSON.parse(JSON.stringify(productItem));
        //get format money from theme
        var themeFormatMoney = prod.format_money;

        var htmlList = [];
        var checkPriority = [];
        var checkBadge = [];
        var htmlLabelText = [];
        var itemsValid = [];
        var filterPriority = [];
        var configLabelText = [];

        // fix for siegmund-welding-tables-usa (tracking qty out of stock product ) - (madu), ninabreddal, dogtas.co.il  by hoaduong
        var outOfStockQuantity = [5673, 12882, 15561]
        if (outOfStockQuantity.indexOf(BSS_PL.storeId) !== -1) {
            // isAvailable = isAvailable && prod.inventory > 0;
        }
        var compareAtPriceMax = prod.compare_at_price_max;
        var productPrice = prod.price;
        var discount = 0;
        if (compareAtPriceMax > 0) {
            // fix round to int
            discount = parseFloat((((compareAtPriceMax - productPrice) / compareAtPriceMax) * 100).toFixed(0));
            if (isNaN(discount)) {
                discount = 0;
            }
        } else {
            //    if compare price blank, then not show {sale} variable -> set to negative number (madu fix)
            discount = -1;
        }
        let discountAmount = productPrice - compareAtPriceMax;

        $.each(data, function (index, item) {
            // check if item has custom selector then return
            // if(item.custom_selector.length) {
            //     continue;
            // }
            //not support 3 theme in free
            var defaultRelatedProduct = ['grid-view-item', 'supports-js', 'grid-product__image-wrapper', 'grid-product__wrapper', 'grid__item small--one-half', 'product-item__link-wrapper']
            var animationClassName = ' '
            switch (item.animation_type) {
                case 1:
                    animationClassName = ' bss-animated bss-animate-pulse ';
                    break;
                case 2:
                    animationClassName = ' bss-animated bss-animate-bounceIn ';
                    break;
                case 3:
                    animationClassName = ' bss-animated bss-animate-bounceOut ';
                    break;
                case 4:
                    animationClassName = ' bss-animated bss-animate-swing ';
                    break;
                case 5:
                    animationClassName = ' bss-animated bss-animate-hiThere ';
                    break;
                case 6:
                    animationClassName = ' bss-animated bss-animate-flash ';
                    break;
                case 7:
                    animationClassName = ' bss-animated bss-animate-rollIn ';
                    break;
                case 8:
                    animationClassName = ' bss-animated bss-animate-rollOut ';
                    break;
            }
            var customRelatedProduct = (item.related_product_tag !== null && item.related_product_tag !== '' && item.related_product_tag != undefined) ? item.related_product_tag.split(',') : []
            if (customRelatedProduct.length) {
                defaultRelatedProduct = customRelatedProduct
            }
            // var isRelatedProduct = false;
            for (var i = 0; i < defaultRelatedProduct.length; i++) {
                var trimItem = defaultRelatedProduct[i].trim();
                if ($(parent).hasClass(trimItem)) {
                    // isRelatedProduct = true;
                    break;
                }
            }
            var isAllowByCustomer = getAllowCustomer($, BSS_PL, item);
            var isShowByVisibilityDate = getInfoVisibilityDate($, BSS_PL, item)
            var isAllowCountry = BSS_PL.isAllowCountry(item);
            let checkVisibilityPeriod = BSS_PL.checkVisibilityPeriod(item,prod);
            var isShowByFixedTime = getVisibilityFixedTimeInfo($, BSS_PL, item)

            if (BSS_PL.currentPlan == 'free' || BSS_PL.currentPlan == 'five_usd') {
                isAllowByCustomer = true;
            }

            if (isAllowCountry && isAllowByCustomer && isShowByVisibilityDate && checkVisibilityPeriod && isShowByFixedTime) {
                if (item.pages) {

                    var path = window.location.pathname.split('/');
                    var page = path[path.length - 2];
                    var searchResultPage = '';
                    if (page == 'pages') {
                        searchResultPage = path[path.length - 1];
                    }
                    var isProductPage = page == "products";

                    var isHomePage = (path[0] == "" && path[1] == "")
                    var isCollectionPage = page == "collections" || (path.indexOf("collections") !== -1 && !isProductPage && !isHomePage);
                    var isSearchPage = page == 'search' || searchResultPage == 'search-results' || searchResultPage == 'search-results-page' || (path.indexOf("search") !== -1 && !isProductPage && !isCollectionPage && !isHomePage);
                    var isOtherPages = !isCollectionPage && !isProductPage && !isSearchPage && !isHomePage;

                    var activePages = item.pages.split(",");
                    var isActive = (activePages.indexOf("2") >= 0 && isCollectionPage)
                        || (activePages.indexOf("7") >= 0 && isHomePage)
                        || (activePages.indexOf("3") >= 0 && isOtherPages)

                    if (item.collection_image_type == 0) {
                        isActive = false ;
                    }
                    if (isActive) {
                        if (item.img_url || (item.label_text_enable && item.label_text) || item.public_url_s3.length) {

                            if ((BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd')&& item.collection_image_type == 1) {
                                if (item.collection_image && res.collects) {
                                    var collections = item.collection_image.split(',');
                                    var prodCol = $.inArray(res.collects.toString(), collections);
                                    if (prodCol == -1) {
                                        return;
                                    }
                                }
                                else {
                                    return;
                                }
                            }

                            if (BSS_PL.currentPlan == "twenty_usd" && item.position == 9) {
                                // do nothing
                            } else {
                                if (item.priority || item.priority == 0) {
                                    if (!item.label_text_enable) {
                                        if (typeof filterPriority[item.position] != "undefined" && filterPriority[item.position] < item.priority) {
                                            return;
                                        }
                                    }
                                }
                            }

                            let className = '';
                            let styleName = '';
                            let styleForLabelText = '';
                            if (item.label_type == 1 || item.label_type == null) {
                                if (BSS_PL.currentPlan == "twenty_usd" && item.position == 9) {
                                    // do nothing
                                } else {
                                    className = 'bss-pl-top-left';
                                    switch (item.position) {
                                        case 1 :
                                            className = 'bss-pl-top-center';
                                            break;
                                        case 2 :
                                            className = 'bss-pl-top-right';
                                            break;
                                        case 3 :
                                            className = 'bss-pl-middle-left';
                                            break;
                                        case 4 :
                                            className = 'bss-pl-middle-center';
                                            break;
                                        case 5 :
                                            className = 'bss-pl-middle-right';
                                            break;
                                        case 6 :
                                            className = 'bss-pl-bottom-left';
                                            break;
                                        case 7 :
                                            className = 'bss-pl-bottom-center';
                                            break;
                                        case 8 :
                                            className = 'bss-pl-bottom-right';
                                            break;
                                    }
                                }
                            } else {
                                if (BSS_PL.currentPlan == "twenty_usd" && item.position == 9) {
                                    // do nothing
                                } else {
                                    className = 'bss-pb-bottom-left';
                                    switch (item.position) {
                                        case 1 :
                                            className = 'bss-pb-bottom-center';
                                            break;
                                        case 2 :
                                            className = 'bss-pb-bottom-right';
                                            break;
                                    }
                                }
                            }
                            if ($(parent).hasClass('hide')) {
                                $(parent).addClass('hide-clone').removeClass('hide')
                            }
                            // let parentProdH = $(parent).outerHeight();
                            // let imgProdH = $(parent).find('img').outerHeight();
                            var parentProdW = $(parent).outerWidth();
                            if ($(parent).hasClass('hide-clone')) {
                                $(parent).addClass('hide').removeClass('hide-clone')
                            }
                            // if ($.inArray(item.position, [3, 4, 5, 6, 7, 8]) !== -1) {
                            //  styleName += 'bottom: ';
                            //  styleName += parseFloat(parentProdH) - parseFloat(imgProdH);
                            //  styleName += 'px;';
                            // }
                            if (BSS_PL.currentPlan == "twenty_usd" && item.position == 9) {
                                // do nothing
                            } else {
                                if ($.inArray(item.position, [1, 2, 4, 5, 7, 8]) !== -1) {
                                    styleName += 'right: ';
                                    if ($(parent).hasClass('product-card--list')) {
                                        //Comment to fix bugs wrong label position on product card list of Express theme
                                        //styleName += parseFloat(parentProdW) - parseFloat(imgProdW);
                                    } else if ($(parent).hasClass('cart__image-wrapper')) {
                                        styleName += parseFloat(parentProdW) - parseFloat($(parent).width());
                                    } else if ($(parent).hasClass('featured-product__photo')) {
                                        styleName += 0;
                                    } else {
                                        //styleName += parseFloat(parentProdW) - parseFloat($(parent).parent().width());
                                        styleName += 0;
                                    }
                                    styleName += 'px;';
                                }
                                if ($.inArray(item.position, [2, 5, 8]) !== -1) {
                                    styleName += 'left: auto !important;';
                                }
                            }
                            var imgUrl = res.baseImgUrl + item.img_url;
                            if (item.public_url_s3.length) {
                                imgUrl = item.public_url_s3;
                            }
                            if (item.public_img_url) {
                                imgUrl = item.public_img_url;
                            }

                            if (item.label_text_enable && item.label_text && item.label_text != '') {
                                styleForLabelText = styleName + BSS_PL.resizeLabelText(item);
                                if (item.position == 9) {
                                    BSS_PL.handlePositionInPlatinum(item, parent)
                                    var unlimitedCss = unlimitedCssFixBugForStores($, BSS_PL, item, parent)
                                    styleForLabelText += unlimitedCss
                                }
                            }
                            styleName += BSS_PL.resizeImage(item);
                            if (item.position == 9 && checkPCScreen) {
                                BSS_PL.handlePositionInPlatinum(item, parent)
                                styleName += `top : ${item.desktop_label_unlimited_top - item.desktop_label_unlimited_height / 2}% !important;
                                                            left : ${item.desktop_label_unlimited_left  - item.desktop_label_unlimited_width / 2}% !important; `
                            }
                            if (item.mobile_position == 9 && !checkPCScreen) {
                                BSS_PL.handlePositionInPlatinum(item, parent)
                                styleName += `top : ${item.mobile_label_unlimited_top - item.mobile_label_unlimited_height / 2}% !important;
                                                            left : ${item.mobile_label_unlimited_left - item.mobile_label_unlimited_width / 2}% !important; `
                            }
                            let labelTypeClass = 'bss-pl-frontend';
                            if (item.label_type == 2) {
                                labelTypeClass = 'bss-pb-frontend';
                            }
                            let zIndexLabelText = 'z-index: 4;';
                            // check z-index in free themes
                            if ($('.card-wrapper .card--media .card__inner') && $('.card-wrapper .card--media .card__inner').find(`.${labelTypeClass}`)) {
                                zIndexLabelText = 'z-index: 2;';
                            }
                            var imgTag = '<img src="' + imgUrl + '" alt="' + item.name + '" class="' + labelTypeClass + ' ' + className + animationClassName + '" style="' + styleName + zIndexLabelText + '; position: absolute !important; background-color: transparent; display: block; min-height: auto !important; padding-left: inherit; padding-top: inherit ; transform: rotate('+item.angle+'deg) ; transform-origin: top left;" />';
                            if (item.label_text_enable) {
                                var labelText = '';
                                if (item.label_text && item.label_text != '') {
                                    var isShowLabelText = true;
                                    var isContainSale = item.label_text.indexOf('{sale}') !== -1;
                                    if (isContainSale && discount <= 0) {
                                        isShowLabelText = false;
                                    }
                                    let checkPCScreen = $(window).width() > 768
                                    var itemWidth;
                                    var itemHeight;

                                    if ((item.position == 9 && checkPCScreen) || (item.mobile_position == 9 && !checkPCScreen)) {
                                        itemWidth = !checkPCScreen ? item.mobile_label_unlimited_width : item.desktop_label_unlimited_width;
                                        itemHeight = !checkPCScreen ? item.mobile_label_unlimited_height : item.desktop_label_unlimited_height;
                                    } else {
                                        if (!checkPCScreen) {
                                            itemWidth = item.mobile_width_label;
                                            itemHeight = item.mobile_height_label;
                                        } else {
                                            itemWidth = item.desktop_width_label;
                                            itemHeight = item.desktop_height_label;
                                        }
                                    }
                                    if ((item.desktop_fixed_percent_label && checkPCScreen) || (item.mobile_fixed_percent_label && !checkPCScreen)) {
                                        if (itemWidth > 100) {
                                            itemWidth = 100;
                                        }
                                        if (itemHeight > 100) {
                                            itemHeight = 100;
                                        }
                                    }

                                    if (isShowLabelText) {
                                        configLabelText.push(item)
                                        var backgroundColor = parseInt(item.transparent_background) === 1 ? 'transparent' : item.label_text_background_color;
                                        var boxShadow = item.label_shadow + 'px ' + item.label_shadow + 'px ' + item.label_shadow + 'px ' + item.label_shadow_color;
                                        var borderRadius = item.label_border_radius + 'px';
                                        let shape = item.label_shape;
                                        let textAngle = (item.label_shape === 'trapezoid' || item.label_shape === 'triangle') ? (Math.atan2(itemHeight, itemWidth) * 180 / Math.PI) : 0;
                                        var textContent = unescape(item.label_text);
                                        var marginTopLabelText = getConfigMarginTopLabel($, BSS_PL, item, parent, page, 1);
                                        var marginLeftLabelText = getConfigMarginLeftLabel($, BSS_PL, item, parent, page, 1);
                                        let emojiArray = item.emoji ? item.emoji.split(',') : [];
                                        let emojiPositionArray = item.emoji_position ? item.emoji_position.split(',') : [];
                                        if (item.enable_countdown_timer && textContent.indexOf('{start}') > -1) {
                                            textContent = textContent.replace('{start}', `<span class="bss-text-content-start-${item.label_text_id}">{start}</span>`)
                                        }
                                        if (item.enable_countdown_timer && textContent.indexOf('{end}') > -1) {
                                            textContent = textContent.replace('{end}', `<span class="bss-text-content-end-${item.label_text_id}">{end}</span>`)
                                        }
                                        //encode emoji
                                        for (let i = 0; i < emojiArray.length; i++) {
                                            if (emojiArray[i].length == 6) {
                                                if (textContent.indexOf(String.fromCodePoint(emojiArray[i])) > -1) {
                                                    let spanEmoji = `<span class="bss-pl-text-emoji" style="width: ` + item.label_text_font_size + `px; height: ` + item.label_text_font_size + `px; display: inline-block; background-image: url(&quot;https://unpkg.com/emoji-datasource-facebook@5.0.1/img/facebook/sheets-256/64.png&quot;); background-size: 5700% 5700%; background-position: ` + emojiPositionArray[i] + `;"></span>`;//create element span emoji
                                                    let firstText = textContent.slice(0, textContent.indexOf(String.fromCodePoint(emojiArray[i])))
                                                    let secondText = textContent.slice(textContent.indexOf(String.fromCodePoint(emojiArray[i])) + 2)

                                                    textContent = firstText + spanEmoji + secondText
                                                }
                                            }
                                        }
                                        //remove text emoji after encode
                                        for (let i = 127462; i < 127488; i++) {
                                            if (textContent.indexOf(String.fromCodePoint(i.toString())) > -1) {
                                                let firstText = textContent.slice(0, textContent.indexOf(String.fromCodePoint(i.toString())))
                                                let secondText = textContent.slice(textContent.indexOf(String.fromCodePoint(i.toString())) + 2)

                                                textContent = firstText + secondText
                                            }
                                        }
                                        //show total quantity in label text
                                        textContent = textContent.replace("{inventory_quantity}", '');
                                        //show discount amount in label text
                                        if (discountAmount < 0) {
                                            if (textContent.indexOf("{sale_amount}") > -1) {
                                                if (themeFormatMoney[0] != '{') {
                                                    textContent = textContent.replace("{sale_amount}", '');
                                                } else {
                                                    textContent = textContent.replace("{sale_amount}", '');
                                                }
                                            }
                                        } else {
                                            textContent = textContent.replace("{sale_amount}", '');
                                        }

                                        // let discountContent = parseInt(discount) + '%'
                                        // fix sale discount price, if discount is negative, then do not show anything (nadu fix)
                                        if (discount <= 0) {
                                            // discountContent = '';
                                        }
                                        textContent = textContent.replace("{sale}", '');

                                        textContent = textContent.replace("{inventory}", '');

                                        labelText = '<div alt="' + `${item.statusLabelAltText == 1 ? item.labelAltText : item.name}` + '" data-bss-pl-text-id="bss-pl-text-' + item.label_text_id + '" class="bss-countdown-display ' + labelTypeClass + ' bss_pl_label_text ' + className + animationClassName + ' bss-pl-' + shape + '" style="' + styleForLabelText + `; display: ${item.enable_countdown_timer == 1 ? 'none' : 'flex'}; justify-content: center; align-items: center; text-align: center;`
                                            + ' font-style: ' + ((item.label_text_style == 1 || item.label_text_style == 3) ?  'italic' : 'normal') + ';'
                                            + ' font-weight: ' + ((item.label_text_style == 2 || item.label_text_style == 3) ? 'bold' : 'normal') + ';'
                                            + ' color: ' + item.label_text_color + ';'
                                            + ' border-radius: ' + borderRadius + ';'
                                            + ' margin-top: ' + marginTopLabelText + 'px;'
                                            + ' margin-left: ' + marginLeftLabelText + 'px;'
                                            + ' box-shadow: ' + boxShadow + ';'
                                            + ' opacity: ' + item.label_opacity / 100 + ";"
                                            + ' font-size: ' + item.label_text_font_size + 'px;'
                                            + zIndexLabelText
                                            + ' position: absolute !important; '
                                            + ' padding-top: inherit ; '
                                            + ' background-clip: content-box;'
                                            + ' background-color: ' + backgroundColor + `;" ><span style="rotate: ` + textAngle + `deg;" class="bss_pl_text_hover_text">`
                                            + textContent
                                            + '</span>'
                                            + '</div>';
                                    }
                                }
                                imgTag = labelText;
                            }
                            // priority when store old
                            if (BSS_PL.storeId <= BSS_PL.storeIdOldWIthPriority) {
                                if (item.label_type == 2) {
                                    // for badge
                                    if (itemsValid.length == 0) {
                                        if (BSS_PL.currentPlan == "twenty_usd" && item.position == 9) {
                                            htmlList.push(imgTag)
                                        } else {
                                            if (item.label_text_enable) {
                                                htmlLabelText.push(imgTag);
                                            } else {
                                                htmlList[item.position] = imgTag;
                                            }
                                        }
                                        itemsValid.push(item);
                                    } else {
                                        itemsValid.map((label) => {
                                            // check if has same position
                                            if (label.position !== item.position) {
                                                itemsValid.push(item);
                                                if (BSS_PL.currentPlan == "twenty_usd" && item.position == 9) {
                                                    htmlList.push(imgTag)
                                                } else {
                                                    if (item.label_text_enable) {
                                                        htmlLabelText.push(imgTag);
                                                    } else {
                                                        htmlList[item.position] = imgTag;
                                                    }
                                                }
                                            }
                                        });
                                    }
                                } else if (BSS_PL.currentPlan == 'twenty_usd') {
                                    // for label (20$)
                                    if (itemsValid.length == 0) {
                                        if (BSS_PL.currentPlan == "twenty_usd" && item.position == 9) {
                                            htmlList.push(imgTag)
                                        } else {
                                            if (item.label_text_enable) {
                                                htmlLabelText.push(imgTag);
                                            } else {
                                                htmlList[item.position] = imgTag;
                                            }
                                        }
                                        itemsValid.push(item);
                                    } else {
                                        itemsValid.map((label) => {
                                            // check if has same position
                                            if (((!checkPCScreen ? label.mobile_label_unlimited_left : label.desktop_label_unlimited_left) !== (!checkPCScreen ? item.mobile_label_unlimited_left : item.desktop_label_unlimited_left)) || (!checkPCScreen ? label.mobile_label_unlimited_top : label.desktop_label_unlimited_top) !== (!checkPCScreen ? item.mobile_label_unlimited_top : item.desktop_label_unlimited_top)) {
                                                if (BSS_PL.currentPlan == "twenty_usd" && !checkPCScreen ? item.mobile_position == 9 : item.position == 9) {
                                                    htmlList.push(imgTag)
                                                } else {
                                                    if (item.label_text_enable) {
                                                        htmlLabelText.push(imgTag);
                                                    } else {
                                                        htmlList[item.position] = imgTag;
                                                    }
                                                }
                                                itemsValid.push(item);
                                            }
                                        });
                                    }
                                } else {
                                    // for label basic plan
                                    if (itemsValid.length == 0) {
                                        if (item.label_text_enable) {
                                            htmlLabelText.push(imgTag);
                                        } else {
                                            htmlList[item.position] = imgTag;
                                        }
                                        itemsValid.push(item);
                                    } else {
                                        itemsValid.map((label) => {
                                            // check if has same position
                                            // label text
                                            if (item.label_text_enable) {
                                                htmlLabelText.push(imgTag);
                                            } else {
                                                // label image
                                                if (label.position !== item.position) {
                                                    htmlList[item.position] = imgTag;
                                                }
                                            }
                                            itemsValid.push(item);

                                        });
                                    }
                                }
                            } else {
                                if (BSS_PL.currentPlan == "twenty_usd" && item.position == 9) {
                                    htmlList.push(imgTag)
                                } else {
                                    // check badge
                                    if (item.label_type == 2) {
                                        if (checkBadge[item.position] !== true) {
                                            checkBadge[item.position] = true;
                                            htmlList.push(imgTag);
                                        }
                                    } else {
                                        if (item.label_text_enable) {
                                            htmlList.push(imgTag);
                                        } else {
                                            if (checkPriority[item.position] !== true) {
                                                checkPriority[item.position] = true;
                                                htmlList.push(imgTag);
                                            }
                                        }
                                    }
                                }
                            }
                            // }
                        }
                    }
                }
            }
        });
        BSS_PL.onClickThumbnailResizeMarginLabelText(configLabelText)
        if (BSS_PL.storeId <= BSS_PL.storeIdOldWIthPriority) {
            htmlList = htmlList.concat(htmlLabelText)
        }
        return htmlList;
    };

    BSS_PL.initCollections();
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/label/fixResizeMarginLabelOnScroll.js


function fixResizeMarginLabelOnScroll($, BSS_PL) {
    //onclick thumbnail caculation margin_top, margin_left
    BSS_PL.onClickThumbnailResizeMarginLabelText = function (configLabelText) {
        var pathName = window.location.pathname;
        if (pathName.endsWith('/')) {
            pathName = pathName.slice(0, -1);
        }
        var path = pathName.split('/');
        var page = path[path.length - 2];
        var handleProductPage = path.pop(-1);
        var parent = $(`[data-handle="${handleProductPage}"]`);

        /** FIX SUPPORT BY STORE ID */
        if (typeof bssFixSupportResizeMarginLabelTextOnScroll == 'function') {
            // eslint-disable-next-line
            bssFixSupportResizeMarginLabelTextOnScroll($, BSS_PL, parent, page, configLabelText, getConfigMarginTopLabel, getConfigMarginLeftLabel)
        }
        /** END FIX SUPPORT BY STORE ID */
    }
}

// CONCATENATED MODULE: ./src/public/static/base/js/src/init/bssProductLabelRunScript.js









function bssProductLabelRunScript($, BSS_PL) {
    let checkPCScreen = $(window).width() > 768
    var checkPageFly = true;
    let path = window.location.pathname.split('/');
    let page = path[path.length - 2];
    var isProductPage = page == "products";

    if (typeof bssPlApiServer == 'undefined') {
        // eslint-disable-next-line
        var bssPlApiServer = BSS_PL.apiServerProduction;
    }

    // fix for supersports by DuBD
    if (BSS_PL.storeId === 9518 && window.location.pathname.includes('/blogs/')) return;

    var excludedPages = ['customer-reviews'];
    if (BSS_PL.storeId == 2092) {
        //Fix for https://madbutchermeat.com/
        excludedPages = ['customer-reviews']
    }
    // fix for hotpotbelly by XuTho
    if (BSS_PL.storeId === 4237) {
        excludedPages = ['customer-reviews']
    }
    // fix for asienlivs by HatDauXanh
    if (BSS_PL.storeId === 28005) {
        excludedPages = ['customer-reviews', 'account']
    }
    if (BSS_PL.storeId === 12229) {
        excludedPages = ['account']
    }

    var pageName = path[path.length - 1];
    var accountPage = path[1];
    if (excludedPages.indexOf(pageName) !== -1 || excludedPages.indexOf(accountPage) !== -1) {
        return;
    }
    var firstLoadProduct = true;
    BSS_PL.handlePositionInPlatinum = function handlePositionInPlatinum(item, parent, page) {
        let listPage = [];
        
        const addCollectionStore = [9493, 15322, 24729]
        if(addCollectionStore.indexOf(BSS_PL.storeId) != -1 && page == 'collections'){
            listPage.push('collections')
        }

        if (listPage.indexOf('collections') === -1 || listPage.indexOf('products') === -1 || listPage.indexOf('/') === -1 || listPage.indexOf('/search') === -1) {
            // eslint-disable-next-line
            let widthParent = $(parent).find('img[src*=\"//cdn.shopify.com/s/files/\"]:not(.bss-pl-frontend), img[srcset*="/cdn.shopify.com/s/files/"]:not(.bss-pl-frontend)').first().width()
            // eslint-disable-next-line
            let heightParent = $(parent).find('img[src*=\"//cdn.shopify.com/s/files/\"]:not(.bss-pl-frontend), img[srcset*="/cdn.shopify.com/s/files/"]:not(.bss-pl-frontend)').first().height()
            if (Shopify && Shopify.theme && Shopify.theme.name && (Shopify.theme.name.includes("Dawn") || Shopify.theme.name.includes("Sense"))) {
                // eslint-disable-next-line
                if (page != 'products') {
                    if ($(parent).hasClass('product__media')) {
                        // eslint-disable-next-line
                        heightParent = $(parent).closest('.card-wrapper ').find('img[src*=\"//cdn.shopify.com/s/files/\"]:not(.bss-pl-frontend), img[srcset*="/cdn.shopify.com/s/files/"]:not(.bss-pl-frontend)').first().height()
                        // eslint-disable-next-line
                        widthParent = $(parent).closest('.card-wrapper ').find('img[src*=\"//cdn.shopify.com/s/files/\"]:not(.bss-pl-frontend), img[srcset*="/cdn.shopify.com/s/files/"]:not(.bss-pl-frontend)').first().width()
                    }
                }
                if (page == 'products' && $(parent).hasClass('card__heading h5')) {
                    heightParent = $(parent).closest('.card-wrapper ').find(".card__inner ").first().height()
                    widthParent = $(parent).closest('.card-wrapper ').find(".card__inner ").first().width()
                }
            }
            // fix for dokoyounderwear-com by vani
            if (BSS_PL.storeId == 30137) {
                if (page == 'products') {
                    widthParent = $(parent).closest('.product-gallery-wrap').find(".main-image-holder").first().width()
                    heightParent = $(parent).closest('.product-gallery-wrap').find(".main-image-holder").first().height()
                }
                if (page != 'products') {
                    if ($(parent).hasClass('product-single__title')) {
                        // eslint-disable-next-line
                        heightParent = $(parent).closest('.AddToCartForm').find('img[src*=\"//cdn.shopify.com/s/files/\"]:not(.bss-pl-frontend), img[srcset*="/cdn.shopify.com/s/files/"]:not(.bss-pl-frontend)').first().height()
                        // eslint-disable-next-line
                        widthParent = $(parent).closest('.AddToCartForm').find('img[src*=\"//cdn.shopify.com/s/files/\"]:not(.bss-pl-frontend), img[srcset*="/cdn.shopify.com/s/files/"]:not(.bss-pl-frontend)').first().width()
                    }
                }
            }
            // fix for mr-vape-uk by huynt
            else if (BSS_PL.storeId == 30594) {
                if (page == 'products') {
                    widthParent = $(parent).closest('.product__media-item').find(".product__media-image-wrapper").first().width()
                    heightParent = $(parent).closest('.product__media-item').find(".product__media-image-wrapper").first().height()
                }
            }
            if (widthParent && heightParent) {
                if (!checkPCScreen ? item.mobile_fixed_percent_label == 0 : item.desktop_fixed_percent_label == 0) {
                    let leftPx = (!checkPCScreen ? item.mobile_label_unlimited_left : item.desktop_label_unlimited_left) * widthParent / 100
                    if (leftPx + (!checkPCScreen ? item.mobile_label_unlimited_width : item.desktop_label_unlimited_width) > widthParent) {
                        !checkPCScreen ? item.mobile_label_unlimited_left = leftPx * 100 / widthParent : item.desktop_label_unlimited_left = leftPx * 100 / widthParent //%
                    }

                    let topPx = (!checkPCScreen ? item.mobile_label_unlimited_top : item.desktop_label_unlimited_top) * heightParent / 100
                    if (topPx + (!checkPCScreen ? item.mobile_label_unlimited_height : item.desktop_label_unlimited_height) > heightParent) {
                        !checkPCScreen ? item.mobile_label_unlimited_top = topPx * 100 / heightParent : item.desktop_label_unlimited_top = topPx * 100 / heightParent //%
                    }
                    if (BSS_PL.storeId == 10884 && ((!checkPCScreen ? item.mobile_label_unlimited_left : item.desktop_label_unlimited_left) < 0 || leftPx < 0)) {
                        !checkPCScreen ? item.mobile_label_unlimited_left : item.desktop_label_unlimited_left = 0
                    }
                }
            }

        }
    }

    BSS_PL.getCurrentVariant = function getCurrentVariant(currentProduct) {
        let defaultOptionsValue = [];
        let defaultOptions = document.querySelectorAll('.product-main__variants__item .product-color-swatch .product-color-swatch__title',
            '.product-size-selector .product-size-selector__el li:checked'
        );

        if (BSS_PL.storeId == 11362) {
            let colorArr = document.querySelectorAll('.product-main__variants__item .product-color-swatch .color-variant-1');
            let sizeArr = document.querySelectorAll('.product-size-selector .product-size-selector__el li[selected]');
            defaultOptions = [...sizeArr, ...colorArr]
        }
        defaultOptions.forEach((option) => {
            if (BSS_PL.storeId == 11362) {
                if (option.value) {
                    defaultOptionsValue.push(option.value);
                } else {
                    let first = option.innerHTML.indexOf('(')
                    let last = option.innerHTML.indexOf(')')
                    defaultOptionsValue.push(option.innerHTML.slice(first + 1, last));
                }
            } else {
                defaultOptionsValue.push(option.value);
            }
        });

        defaultOptionsValue = defaultOptionsValue.join(" / ");
        (BSS_PL.storeId == 11362) ? defaultOptionsValue = defaultOptionsValue[0] : defaultOptionsValue;
        let productVariant = false;
        if (defaultOptionsValue.length == 0) {
            productVariant = currentProduct.variants[0];
        } else {
            currentProduct.variants.forEach((variant) => {
                if (variant.title == defaultOptionsValue || variant.title.includes(defaultOptionsValue)) {
                    productVariant = variant.id;
                }
            });
        }
        return productVariant
    }

    //Init page fly adapter
    function checkLanguageLabel(label) {
        if (BSS_PL.storeId == 3543) {
            if (Array.isArray(label.name.match(/\[PN] $|\[PN]$/))) {
                return true;
            }
        }
        if (BSS_PL.storeId == 13134 || BSS_PL.storeId == 14857 || BSS_PL.storeId == 17781 || BSS_PL.storeId == 27130) {
            return true
        }
        let languageCode = document.documentElement.lang;
        let labelCode = getLanguageCode(label.name);
        if (BSS_PL.storeId == 34815) {
            languageCode = document.querySelector(".current_lang").attributes['data-language-code'].value;
        }
        if (labelCode.length) {
            if (languageCode == labelCode) {
                return true
            } else {
                return false;
            }
        }
        return true;
    }

    function getLanguageCode(labelName) {
        let languageCode = labelName.substring(
            labelName.indexOf("[") + 1,
            labelName.indexOf("]")
        );
        return languageCode;
    }

    initPageFlyAdapter(BSS_PL, checkLanguageLabel)

    // fix for shemariehair by vitu
    BSS_PL.checkProductPage = false

    BSS_PL.init = function () {
        var listItems = $('a[href*="/products/"]:not([data-bss-pl=active]):not(.action-link)');

        /** FIX SUPPORT BY STORE ID */
        if (typeof bssFixSupportProductLinks == 'function') {
            // eslint-disable-next-line
            listItems = bssFixSupportProductLinks($, BSS_PL, listItems)
        }
        /** END FIX SUPPORT BY STORE ID */

        // list item for pagefly (Thabi)
        var listItemsPageFly = $('div[data-pf-type="ProductImage2"]:not([bss-pl-product-active]),' +
            'div[data-pf-type="ProductImage"]:not([bss-pl-product-active]),' +
            '[data-pf-type="ProductMedia"] [data-media-type="image"]:not([bss-pl-product-active])');

        if (typeof BSS_PL.configData != 'undefined' && BSS_PL.configData.length && (listItems.length || firstLoadProduct) && !(BSS_PL.storeId == 10914 && window.location.pathname.includes('/en/'))) {
            addDataHandle($, BSS_PL, listItems, checkLanguageLabel, firstLoadProduct)
            firstLoadProduct = false;
            if (
                BSS_PL.storeId == 23567 && window.location.pathname.split('/')[1] == 'collections' ||
                BSS_PL.storeId == 26063 && (window.location.pathname == '/search' || window.location.pathname.split('/')[1] == 'collections') ||
                BSS_PL.storeId == 22756 && window.location.pathname == '/search' || window.location.pathname.split('/')[1] == 'products'
            ) {
                setTimeout(() => {
                    document.querySelectorAll('.bss-countdown-display').forEach((element) => {
                        element.style.display = 'block'
                    })
                    document.querySelectorAll('.bss-countdown-display').forEach((element) => {
                        element.style.display = 'flex'
                    })
                }, 1000)
            }
        }
        // check condition to add label (pagefly - Tabi)
        if (typeof BSS_PL.configData != 'undefined' && BSS_PL.configData.length && (listItemsPageFly.length || firstLoadProduct) && checkPageFly) {
            BSS_PL.addLabelForPageFly($, BSS_PL);
            checkPageFly = false
        }

    }

    BSS_PL.getHandleByUrl = function (url) {
        if (url && url.indexOf('?') > 0) {
            url = url.substring(0, url.indexOf('?'));
        }
        var handle = ''
        if (url && url.indexOf('products') > 0) {
            var path = url.split('/');
            handle = path.pop(-1);
        }
        return handle;
    }

    initBadge(BSS_PL);
    //fix for glamraider (vitu)
    BSS_PL.divideHandlesUrl = function (handlesUrl) {
        let handlesUrlChildArr = []
        var splitIndex = Math.round(handlesUrl.length / 2);
        var max = handlesUrl.length
        var firstHalfArr = handlesUrl.splice(splitIndex, max - splitIndex + 1)
        var firstHalfArrSplitIndex = Math.round(firstHalfArr.length / 2)
        var maxFirstHalfArr = firstHalfArr.length
        var firstHalfArr1 = firstHalfArr.splice(firstHalfArrSplitIndex, firstHalfArr.length - firstHalfArrSplitIndex + 1)
        var firstHalfArr2 = firstHalfArr.splice(0, maxFirstHalfArr - firstHalfArrSplitIndex + 1)
        var secondHalfArr = handlesUrl.splice(0, max - splitIndex + 1)
        var secondHalfArrSplitIndex = Math.round(secondHalfArr.length / 2)
        var maxSecondHalfArr = secondHalfArr.length
        var secondHalfArr1 = secondHalfArr.splice(secondHalfArrSplitIndex, secondHalfArr.length - secondHalfArrSplitIndex + 1)
        var secondHalfArr2 = secondHalfArr.splice(0, maxSecondHalfArr - secondHalfArrSplitIndex + 1)
        handlesUrlChildArr.push(firstHalfArr1, firstHalfArr2, secondHalfArr1, secondHalfArr2)
        return handlesUrlChildArr
    }

    BSS_PL.isAllowCountry = function (item) {
        var isAllowCountry = true;
        if (item.enable_allowed_countries && item.locations) {
            var countries = item.locations.split(",");
            isAllowCountry = countries.indexOf(BSS_PL.countryCode) !== -1;
        }
        return isAllowCountry;
    }

    BSS_PL.getTranslationText = function (item) {
        var translationText = item.label_text;
        if (BSS_PL.currentPlan && (BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd') && item.label_text_enable == 1 && item.translations && item.translations.length) {
            item.translations.forEach(e => {
                if (BSS_PL.countryCode == e.code) {
                    translationText = e.text;
                }
            })
        }
        return translationText;
    }

    BSS_PL.checkVisibilityPeriod = function (item, prod) {
        try {
            if (item.enable_visibility_period === 1 && prod.publish_at) {
                let createdProduct = new Date(prod.publish_at.replace(/ /g, "T").slice(0, prod.publish_at.length - 6))
                createdProduct.setDate(createdProduct.getDate() + item.visibility_period);
                let today = new Date();
                if (createdProduct.getTime() < today.getTime()) {
                    return 0;
                }
            }
            return 1;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(" checkVisibilityPeriod error : ", error)
        }
    }

    BSS_PL.getMaxValueMarginTop = function (data) {
        let marginValue = 0;
        $.each(data, function (index, item) {
            if ((checkPCScreen ? item.margin_top : item.mobile_margin_top) > marginValue) {
                marginValue = checkPCScreen ? item.margin_top : item.mobile_margin_top;
            }
        });
        return marginValue;
    }

    BSS_PL.getMaxValueMarginBottom = function (data) {
        let marginValue = 0;
        $.each(data, function (index, item) {
            if ((checkPCScreen ? item.margin_bottom : item.mobile_margin_bottom) > marginValue) {
                marginValue = checkPCScreen ? item.margin_bottom : item.mobile_margin_bottom;
            }
        });
        return marginValue;
    }
    //onclick thumbnail caculation margin_top, margin_left
    BSS_PL.onClickThumbnailResizeMarginLabelText = function (configLabelText) {
        var pathName = window.location.pathname;
        if (pathName.endsWith('/')) {
            pathName = pathName.slice(0, -1);
        }
        var path = pathName.split('/');
        var page = path[path.length - 2];
        var handleProductPage = path.pop(-1);
        var parent = $(`[data-handle="${handleProductPage}"]`);
        // list class thumbnail
        var thumbnail = $('.product-single__thumbnails-item,' +
            'li.grid__item,' +
            '.thumbnail.slick-slide,' +
            // fix for our-sister by vitu
            '.rondell-item,' +
            '.TabList__Item,' +
            // fix southernstrutbrand by HoangPN
            '.product-single__thumbnail-item, ' +
            // fix for medimasks by HoangPN
            '.product-gallery__thumbnail,' +
            // fix for santalucia by XuTho
            '.view-mode .icon-mode,' +
            // fix for lamachine by XuTho
            '.product-tabs__wrapper a.sf-tab-header,' +
            // fix for 1dropgallery by locnt
            '.thumbnail-list'
        );

        if (thumbnail.length) {
            thumbnail.on('click', function () {
                // get parent wrap bss_pl_img and image product to caculation margin_left, margin_top when onclick thumbnail
                parent = $(this).closest('.product-single__media-group').find('.product-single__media-wrapper').not('.hide');

                /** FIX SUPPORT BY STORE ID */
                if (typeof bssFixSupportOnClickThumbnail == 'function') {
                    // eslint-disable-next-line
                    parent = bssFixSupportOnClickThumbnail($, this, page, parent)
                }
                /** END FIX SUPPORT BY STORE ID */
                configLabelText.map((item) => {
                    var timeouts = 0;
                    if (BSS_PL.storeId == 19775 || BSS_PL.storeId == 21178 || BSS_PL.storeId == 22765) {
                        timeouts = 100;
                    }
                    setTimeout(() => {
                        // fix lamachine by XuTho
                        if (BSS_PL.storeId == 21178 && window.location.pathname == '/') {
                            parent = $(this).closest('.product-tabs__wrapper').find('.active .justify-center.items-center[data-handle]')
                        }
                        var marginTop = getConfigMarginTopLabel($, BSS_PL, item, parent, page, 1);
                        var marginLeft = getConfigMarginLeftLabel($, BSS_PL, item, parent, page, 1);
                        $(parent).find(`div[bss-config-id="${item.label_text_id}"].bss_parent_text`).css('margin-top', `${marginTop}px`);
                        $(parent).find(`div[bss-config-id="${item.label_text_id}"].bss_parent_text`).css('margin-left', `${marginLeft}px`);
                    }, timeouts)
                })
            })
        }
        fixResizeMarginLabelOnScroll($, BSS_PL);
    }

    BSS_PL.resizeImage = function (item) {
        var styleHtml = '';
        var suffix = 'px !important;';
        var itemWidth;
        var itemHeight;
        var itemMarginTop;
        if ((item.position == 9 && checkPCScreen) || (item.mobile_position == 9 && !checkPCScreen)) {
            itemWidth = (!checkPCScreen ? item.mobile_label_unlimited_width : item.desktop_label_unlimited_width)
            itemHeight = (!checkPCScreen ? item.mobile_label_unlimited_height : item.desktop_label_unlimited_height)

        } else {
            if (!checkPCScreen) {
                itemWidth = item.mobile_width_label;
                if (item.label_type == 2 && item.mobile_fixed_percent_label == 1) {
                    itemHeight = "auto";
                } else {
                    itemHeight = item.mobile_height_label;
                }
                itemMarginTop = item.mobile_margin_top;
            } else {
                itemWidth = item.desktop_width_label
                if (item.label_type == 2 && item.desktop_fixed_percent_label == 1) {
                    itemHeight = "auto";
                } else {
                    itemHeight = item.desktop_height_label;
                }
                itemMarginTop = item.margin_top;
            }
        }
        if ((item.desktop_fixed_percent_label && checkPCScreen) || (item.mobile_fixed_percent_label && !checkPCScreen)) {
            suffix = '% !important;';
            if (BSS_PL.storeId == 15494 || BSS_PL.storeId == 15958) {
                suffix = '%;';
            }
            if (itemWidth > 100) {
                itemWidth = 100;
            }
            if (itemHeight > 100) {
                itemHeight = 100;
            }
            if ($(window).width() > 1200 && BSS_PL.storeId == 13744) {
                itemWidth = 25;
            }
        }

        if (itemWidth || itemWidth == 0) {
            styleHtml += 'width:';
            if (itemWidth == -1 || itemWidth == null) {
                styleHtml += 'auto !important;'
            } else {
                styleHtml += itemWidth;
                if (BSS_PL.storeId == 12724 || BSS_PL.storeId == 18833) {
                    styleHtml += '%;';
                } else {
                    styleHtml += suffix;
                }
            }
        }
        if (itemHeight || itemHeight == 0) {
            if (BSS_PL.storeId == 21344) {
                styleHtml += 'height:';
            } else {
                styleHtml += 'height:';
            }
            if (itemHeight == -1 || itemHeight == null) {
                styleHtml += 'auto !important;'
            }
            else {
                styleHtml += itemHeight;
                styleHtml += suffix;
            }

        }
        if (item.label_type == 2 && !item.enable_multi_badge) {
            if (itemMarginTop || itemMarginTop == 0) {
                styleHtml += 'margin-top:';
                styleHtml += itemMarginTop;
                styleHtml += 'px !important;';
            }
        }
        return styleHtml;
    }

    let checkBrowserIsFirefox = window.navigator.userAgent.indexOf("Firefox");

    BSS_PL.resizeLabelText = function (item) {
        var styleHtml = '';
        var suffix = 'px';
        var itemWidth;
        var itemHeight;

        if ((item.position == 9 && checkPCScreen) || (item.mobile_position == 9 && !checkPCScreen)) {
            itemWidth = !checkPCScreen ? item.mobile_label_unlimited_width : item.desktop_label_unlimited_width;
            itemHeight = !checkPCScreen ? item.mobile_label_unlimited_height : item.desktop_label_unlimited_height;
        } else {
            if (!checkPCScreen) {
                itemWidth = item.mobile_width_label;
                if (item.label_type == 2 && item.mobile_fixed_percent_label == 1) {
                    itemHeight = "auto";
                } else {
                    itemHeight = item.mobile_height_label;
                }
            } else {
                itemWidth = item.desktop_width_label;
                if (item.label_type == 2 && item.desktop_fixed_percent_label == 1) {
                    itemHeight = "auto";
                } else {
                    itemHeight = item.desktop_height_label;
                }
            }
        }
        if ((item.desktop_fixed_percent_label && checkPCScreen) || (item.mobile_fixed_percent_label && !checkPCScreen)) {
            suffix = '%';
            if (itemWidth > 100) {
                itemWidth = 100;
            }
            if (itemHeight > 100) {
                itemHeight = 100;
            }
        }

        if (itemWidth || itemWidth == 0) {
            if (checkBrowserIsFirefox > -1) {
                styleHtml += 'width:';
                styleHtml += itemWidth;
                styleHtml += suffix;
                styleHtml += ';';
            } else {
                styleHtml += 'width:';
                styleHtml += 'calc(';
                styleHtml += itemWidth;
                styleHtml += suffix;
                styleHtml += ' + 1px ) ;';
            }
        }
        if (itemHeight || itemHeight == 0) {
            if (BSS_PL.currentPlan == "twenty_usd" && (item.position == 9 && checkPCScreen) || (item.mobile_position == 9 && !checkPCScreen)) {
                styleHtml += 'min-height:';
            } else {
                styleHtml += 'height:';
            }
            if (itemHeight == 'auto') {
                styleHtml += itemHeight + ';';
            } else {
                if (checkBrowserIsFirefox > -1) {
                    styleHtml += itemHeight;
                    styleHtml += suffix;
                    styleHtml += ';';
                } else {
                    styleHtml += 'calc(';
                    styleHtml += itemHeight;
                    styleHtml += suffix;
                    styleHtml += ' + 1px ) ;';
                }
            }
        }

        return styleHtml;

    }

    var timeout = getTimeoutLoadFunction($, BSS_PL)
    var typePage = path[1];

    // fix change {Sale} & {Sale_Amount} by HatDauXanh
    let oldHref = document.location.href;
    let productForm = document.querySelectorAll("product-form.product-form .product-variant-id");
    productForm = Array.from(productForm);
    let bodyList = document.querySelectorAll(".product")
    bodyList = Array.from(bodyList);
    BSS_PL.configData.map(item => {
        if (item.label_text && (item.label_text.includes("%7Bsale%7D") || item.label_text.includes("%7Bsale_amount%7D"))) {
            if (productForm.length) {
                productForm.map(item => {
                    item.addEventListener("change", function () {
                        $(item).closest(".product").find('.bss_pl_img').remove();
                        setTimeout(() => {
                            firstLoadProduct = true;
                            BSS_PL.init();
                            initCollectionLabel($, BSS_PL);
                        }, 100);
                    });
                });
            } else {
                window.onload = function () {
                    bodyList.map(item => {
                        item.addEventListener("change", function () {
                            if (oldHref != document.location.href && document.location.search.includes("?variant")) {
                                oldHref = document.location.href;
                                $(item).find('.bss_pl_img').remove()
                                setTimeout(() => {
                                    firstLoadProduct = true;
                                    BSS_PL.init();
                                    initCollectionLabel($, BSS_PL);
                                }, 100);
                            }
                        });
                    });
                }
            }
        } else {
            return
        }
    })

    if (BSS_PL.storeId == 32803 && page == "collections") {
        let countToStopInterval = 0;
        const interval = setInterval(() => {
            countToStopInterval++
            if ($('.limespot-recommendation-box-carousel .ls-image-wrap').length) {
                BSS_PL.init();
                initCollectionLabel($, BSS_PL);
                clearInterval(interval)
            }
            countToStopInterval > 15 && clearInterval(interval)
        }, 500);
    }

    setTimeout(function () {
        if (typePage !== 'blogs') {
            if (BSS_PL.storeId == 31838) {
                addDataHandle($, BSS_PL, $('a[href*="/products/"]:not([data-bss-pl=active]):not(.action-link)'), checkLanguageLabel, firstLoadProduct)
                firstLoadProduct = false;
            }
            if (BSS_PL.storeId == 32803 && page == "collections") {
                // do nothing
            } else {
                BSS_PL.init();
                initCollectionLabel($, BSS_PL);
                $(window).scroll(function () {
                    if ([29701, 32759, 33730, 29741, 15923, 7563, 3103, 8752, 15564, 20474, 16722, 19213, 22756, 23084, 22707, 4245, 13325, 25056, 28492, 30730, 2569, 13559, 13141, 16940, 11956, 8244, 28337].indexOf(BSS_PL.storeId) != -1) {
                        // do nothing
                    } else if ((BSS_PL.storeId == 25243 || BSS_PL.storeId == 28129 || BSS_PL.storeId == 28337) && typePage == "products") {
                        // do nothing
                    } else if (BSS_PL.storeId == 19917 && typePage != "collections") {
                        // do nothing
                    } else {
                        BSS_PL.init();
                        initCollectionLabel($, BSS_PL);
                    }
                });
            }
        }
        else if ([21084, 27462].includes(BSS_PL.storeId) && typePage == 'blogs') {
            BSS_PL.init();
        }
    }, timeout);

    // re-init labels/badges when the cart item change (quantity,remove,...)
    setTimeout(() => {
        function reInitLabels(selectors) {
            const targetNodes = $(selectors);
            if (targetNodes.length) {
                // eslint-disable-next-line
                const config = { childList: true, subtree: true };
                const callback = (mutationList) => {
                    for (const mutation of mutationList) {
                        if (mutation.type === 'childList') {
                            BSS_PL.init()
                        }
                    }
                };
                let observer = new MutationObserver(callback);
                $(targetNodes).each(function () {
                    observer.observe(this, config);
                })
            }
        }

        if ([34036].includes(BSS_PL.storeId) && !window.location.pathname.includes('/cart')) return;
        reInitLabels('form[action="/cart"]')
    }, 1000)

    // re-init labels/badges (text) when containing the {inventory} and {inventory_quantity} 
    const existLabelInventory = BSS_PL.configData.some(item => item.label_text_enable && (item.label_text.includes("%7Binventory%7D") || item.label_text.includes("%7Binventory_quantity%7D")))

    if (existLabelInventory) {
        let timer;
        if (BSS_PL.currentPlan !== 'twenty_usd' && isProductPage) {
            $('.product form[action="/cart/add"] input.product-variant-id[name="id"][value]').change(function () {
                if ($(this).closest('[class*="featured-product"]').length) {
                    $(this).closest('[class*="featured-product"]').find('.bss_pl_img,.bss_pb_img').remove()
                    $(this).closest('[class*="featured-product"]').find('[data-bss-pl="active"]').removeAttr('data-bss-pl')
                } else {
                    $(this).closest('.product').find('.bss_pl_img,.bss_pb_img').remove()
                    firstLoadProduct = true;
                }

                if (timer) clearTimeout(timer)
                timer = setTimeout(() => { BSS_PL.init() }, 400)
            })
        } else {
            $('[class*="featured-product"] form[action="/cart/add"] input.product-variant-id[name="id"][value]').change(function () {
                $(this).closest('[class*="featured-product"]').find('.bss_pl_img,.bss_pb_img').remove()
                $(this).closest('[class*="featured-product"]').find('[data-bss-pl="active"]').removeAttr('data-bss-pl')

                if (timer) clearTimeout(timer)
                timer = setTimeout(() => { BSS_PL.init() }, 400)
            })
        }
    }

    //init label/badge for blogs
    setTimeout(() => {
        if (typePage == 'blogs') {
            BSS_PL.init();
            initCollectionLabel($, BSS_PL);
        }
    }, 1000)

    // fix specific variant by HuyNT
    function removeVariantImgTag() {
        $('[bss-pl-media-id]').find('.bss_pl_img').remove()
    }
    function removeVariantBadge() {
        $('.bss_pb_img').remove();
    }
    let excludeVariantBadge = [28230]
    if (BSS_PL.currentPlan == 'twenty_usd' && isProductPage && $('[appendvariant = true]') && !$('[appendvariant = true]').find('.bss_pl_img').length && excludeVariantBadge.indexOf(BSS_PL.storeId) === -1) {
        let currentUrl = window.location.href;
        setInterval(() => {
            if (window.location.href !== currentUrl) {
                currentUrl = window.location.href;
                removeVariantImgTag();
                removeVariantBadge();
                firstLoadProduct = true;
                BSS_PL.init();
            }
        }, 100);
    }

    let removeLabelWhenChangeVariant = [21611, 27809, 11305, 20432, 12388, 28027, 31082, 19111, 32692, 5590, 20496, 20078, 36181 , 36860]
    if (removeLabelWhenChangeVariant.indexOf(BSS_PL.storeId) != -1) {
        let currentUrl = window.location.href;
        setInterval(() => {
            if (window.location.href !== currentUrl) {
                currentUrl = window.location.href;
                $('.bss-variant').find('.bss_pl_img').remove();
                firstLoadProduct = true;
                BSS_PL.init();
            }
        }, 100);
    }

    /** FIX SUPPORT BY STORE ID */
    if (typeof bssFixSupportReInitLabel == 'function') {
        // eslint-disable-next-line
        let result = bssFixSupportReInitLabel($, BSS_PL, firstLoadProduct, checkPageFly, initCollectionLabel, initBadge)
        firstLoadProduct = result.firstLoadProduct
        checkPageFly = result.checkPageFly
    }
    /** END FIX SUPPORT BY STORE ID */
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/init/init.js

function Init(BSS_PL) {
    /** START COUNTDOWN FEATURE */
    const getCountDownTime = (distance, formatType, isOutDateCountDownTimer) => {
        let isOutDate = isOutDateCountDownTimer ? 0 : 1
        let days = isOutDate * Math.floor(distance / (1000 * 60 * 60 * 24))
        let hours = isOutDate * Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let minutes = isOutDate * Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        let seconds = isOutDate * Math.floor((distance % (1000 * 60)) / 1000)
        switch (formatType) {
            case 0:
                return `${hours + days * 24}h ${minutes}m ${seconds}s`
            case 1:
                return `${hours + days * 24}h ${minutes}m`
            case 2:
                return `${days}d ${hours}h ${minutes}m`
            default:
                return `${minutes + (60 * (hours + days * 24))}m ${seconds}s`
        }
    }
    const showCountDown = (item, isExistStartVars, isExistEndVars, isOutDateCountDownTimer) => {
        var startCountDownDate = new Date(item.start_day_countdown).getTime()
        var endCountDownDate = new Date(item.countdown_time).getTime()
        var x = setInterval(function () {
            var now = new Date().getTime();
            var startDistance = now - startCountDownDate
            var endDistance = endCountDownDate - now
            let startDistanceFlag = false
            let endDistanceFlag = false
            if (isExistStartVars) {
                var startTimeCountDown = getCountDownTime(startDistance, item.option_format_countdown, isOutDateCountDownTimer);
                document.querySelectorAll(`.bss-text-content-start-${item.label_text_id}`).forEach((element) => {
                    element.innerHTML = startTimeCountDown
                })
                startDistanceFlag = new Date().getTime() >= new Date(item.countdown_time).getTime() - 1000
            }
            if (isExistEndVars) {
                var endTimeCountDown = getCountDownTime(endDistance, item.option_format_countdown, isOutDateCountDownTimer);
                document.querySelectorAll(`.bss-text-content-end-${item.label_text_id}`).forEach((element) => {
                    element.innerHTML = endTimeCountDown
                })
                endDistanceFlag = endDistance <= 1000
            }

            if (startDistanceFlag || endDistanceFlag) {
                clearInterval(x);
                if (item.option_end_countdown == 1) {
                    document.querySelectorAll(`.bss-text-content-end-${item.label_text_id}`).forEach((element) => {
                        element.closest(".bss_pl_label_text").remove()
                    })
                    document.querySelectorAll(`.bss-text-content-start-${item.label_text_id}`).forEach((element) => {
                        element.closest(".bss_pl_label_text").remove()
                    })
                }
            }
        }, 1000);
    }

    if (BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd') {
        BSS_PL.configData.map((item) => {
            if (item.enable_countdown_timer == 1 && item.label_text != null) {
                let isExistStartVars = unescape(item.label_text).indexOf('{start}') > -1
                let isExistEndVars = unescape(item.label_text).indexOf('{end}') > -1
                let isOutDateCountDownTimer = new Date().getTime() > new Date(item.countdown_time).getTime()

                //not show count down if setting "Hidden label when time out" and "Countdown Timer Date" older than now
                if (!(item.option_end_countdown == 1 && isOutDateCountDownTimer)) {
                    showCountDown(item, isExistStartVars, isExistEndVars, isOutDateCountDownTimer)
                }
            }
        })
    }
    setTimeout(() => {
        document.querySelectorAll('.bss-countdown-display').forEach((element) => {
            element.style.display = 'block'
        })
        document.querySelectorAll('.bss-countdown-display').forEach((element) => {
            element.style.display = 'flex'
        })
    }, 2000)
    /** END COUNTDOWN FEATURE */

    if (typeof bssPlApiServer == 'undefined') {
        var bssPlApiServer = "https://product-labels-pro.bsscommerce.com";
    }

    var bssProductLabelLoadScript = function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";

        // If the browser is Internet Explorer.
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
            // For any other browser.
        } else {
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    function compareVersion(v1, v2) {
        if (typeof v1 !== 'string') return false;
        if (typeof v2 !== 'string') return false;
        v1 = v1.split('.');
        v2 = v2.split('.');
        const k = Math.min(v1.length, v2.length);
        for (let i = 0; i < k; ++i) {
            v1[i] = parseInt(v1[i], 10);
            v2[i] = parseInt(v2[i], 10);
            if (v1[i] > v2[i]) return 1;
            if (v1[i] < v2[i]) return -1;
        }
        return v1.length == v2.length ? 0 : (v1.length < v2.length ? -1 : 1);
    }

    function checkIfAnyLabelEnableCountry(items) {
        let isEnable = false;
        if (items && items.length) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].enable_allowed_countries == 1) {
                    isEnable = true;
                    return isEnable;
                }
            }
        }
        return isEnable;
    }

    function checkIfAnyLabelHasTranslations(items) {
        let hasTranslations = false;
        if (items && items.length) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].label_text_enable == 1 && items[i].translations && items[i].translations.length) {
                    hasTranslations = true;
                    return hasTranslations;
                }
            }
        }
        return hasTranslations;
    }

    const runScript = (BSS_PL = {}, jQuery) => {
        let isEnable = checkIfAnyLabelEnableCountry(BSS_PL.configData);
        let hasTranslations = checkIfAnyLabelHasTranslations(BSS_PL.configData);
        if (BSS_PL.currentPlan && (BSS_PL.currentPlan == 'ten_usd' || BSS_PL.currentPlan == 'twenty_usd') && (isEnable || hasTranslations)) {
            let countryCode = '';

            //some browser that is not support for using localstorage, need to check before init label
            if (
                typeof (Storage) !== "undefined" &&
                sessionStorage.countryCode &&
                sessionStorage.countryCode != "NA" &&
                sessionStorage.countryCode != "undefined"
            ) {
                countryCode = sessionStorage.countryCode;
            }
            if (countryCode == '') {
                jQuery.ajax({
                    url: 'https://geo-ip-service.bsscommerce.com/geoip/getCountryByIP',
                    data: { domain: Shopify.shop, app: 'label' },
                    method: 'POST',
                    success: function (data) {
                        if (data.success) {
                            BSS_PL.countryCode = data.countryCode;
                            if (typeof (Storage) !== "undefined") {
                                sessionStorage.countryCode = data.countryCode;
                            }
                        } else {
                            // eslint-disable-next-line no-console
                            console.log("Could not get country by IP")
                        }
                    }
                });
            } else {
                BSS_PL.countryCode = countryCode;
            }
        } else {
            BSS_PL.countryCode = "UNDEFINED";
        }
        bssProductLabelRunScript(jQuery, BSS_PL)
    }

    //check is exist jquery in frontstore
    if ((typeof jQuery === 'undefined') || (compareVersion(jQuery.fn.jquery, "1.7") == -1)) {
        //if none exist jquery, import jquery lib into frontstore
        bssProductLabelLoadScript('//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', function () {
            var jquery341 = jQuery.noConflict(true);
            runScript(BSS_PL, jquery341)
        });
    } else {
        runScript(BSS_PL, jQuery)
    }
}
// CONCATENATED MODULE: ./src/public/static/base/js/src/index.js

//Init label
let storeIdWaitScriptRender = [25230, 32855]
if (storeIdWaitScriptRender.indexOf(BSS_PL.storeId) !== -1) {
  waitForElementToRender('script[src*="bss-pl.js"]', 15000)
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('PL Script Loaded!');
      src_runScript()
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error.message);
    });
} else {
  src_runScript();
}

function src_runScript() {
  const labelScripts = document.querySelector('script[src*="bss-pl.js"]')
  if (labelScripts || "production" != 'production' || BSS_PL.storeId == 32855) {
    if (BSS_PL.storeId == 9518) {
      const ssvnCustom = function() {
        Init(BSS_PL);
        window.removeEventListener("scroll", ssvnCustom)
      }
      if(pageYOffset < 5) {
        setTimeout(() => {
          window.addEventListener("scroll", ssvnCustom)
        }, 500)
      } else {
        Init(BSS_PL);
      }
    } else {
      Init(BSS_PL);
    }
  }
}

function waitForElementToRender(selector, timeout) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    function checkElement() {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout: Script not found'));
      } else {
        setTimeout(checkElement, 50);
      }
    }
    checkElement();
  });
}

/***/ })
/******/ ]);