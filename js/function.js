(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 

	/* Preloader Effect */
	$window.on('load', function(){
		$(".preloader").fadeOut(600);
	});

	/* Sticky Header */	
	var $stickyBox = $('.header-sticky');

	$window.on("scroll", function() {
		var fromTop = $window.scrollTop();
		if (fromTop > 200) {
			$stickyBox.addClass("active");
		} else {
			$stickyBox.removeClass("active");
		}
	});
	
	/* Slick Menu JS */
	$('#menu').slicknav({
		label : '',
		prependTo : '.responsive-menu'
	});

	if($("a[href='#top']").length){
		$(document).on("click", "a[href='#top']", function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* Product Single Image Slider JS */
	// THUMBNAILS (LEFT)
	var swiperThumbs = new Swiper(".product-single-image-slider", {
		spaceBetween: 10,
		slidesPerView: 3,
		loop: true,
		speed: 1000,
		watchSlidesProgress: true,
		slideToClickedSlide: true,
		allowTouchMove: true,
		breakpoints:{
			767:{
				spaceBetween: 0,
			}
		}
	});

	// MAIN IMAGE (RIGHT)
	var swiperMain = new Swiper(".product-single-image-item", {
		spaceBetween: 0,
		slidesPerView: 1,
		loop: true,
		speed: 1000,
		thumbs: {
			swiper: swiperThumbs,
		},
	});
	
	if ($('.skills-progress-bar').length) {
    $('.skills-progress-bar').waypoint(function () {

        // ─── HORIZONTAL: animate WIDTH ───
        $('.skillbar').each(function () {
            $(this).find('.count-bar').animate({
                width: $(this).attr('data-percent')
            }, 2000);
        });

        // ─── VERTICAL: animate HEIGHT ───
        $('.skillbar-vertical').each(function () {
            $(this).find('.count-bar-vertical').animate({
                height: $(this).attr('data-percent')
            }, 2000);
        });

		}, {
			offset: '70%'
		});
	}

	/* Youtube Background Video JS */
	if ($('#youtubevideo').length) {
		var myPlayer = $("#youtubevideo").YTPlayer();
	}

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 6, time: 3000 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

	/* Text Effect Animation */
	function initHeadingAnimation() {
		
		if($('.text-effect').length) {
			var textheading = $(".text-effect");

			if(textheading.length === 0) return; gsap.registerPlugin(SplitText); textheading.each(function(index, el) {
				
				el.split = new SplitText(el, { 
					type: "lines,words,chars",
					linesClass: "split-line"
				});
				
				if( $(el).hasClass('text-effect') ){
					gsap.set(el.split.chars, {
						opacity: .3,
						x: "-7",
					});
				}
				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 92%",
						end: "top 60%",
						markers: false,
						scrub: 1,
					},

					x: "0",
					y: "0",
					opacity: 1,
					duration: .7,
					stagger: 0.2,
				});
				
			});
		}
		
		if ($('.text-anime-style-1').length) {
			let staggerAmount 	= 0.05,
				translateXValue = 0,
				delayValue 		= 0.5,
			   animatedTextElements = document.querySelectorAll('.text-anime-style-1');
			
			animatedTextElements.forEach((element) => {
				let animationSplitText = new SplitText(element, { type: "chars, words" });
					gsap.from(animationSplitText.words, {
					duration: 1,
					delay: delayValue,
					x: 20,
					autoAlpha: 0,
					stagger: staggerAmount,
					scrollTrigger: { trigger: element, start: "top 85%" },
					});
			});		
		}
		
		if ($('.text-anime-style-2').length) {				
			let	 staggerAmount 		= 0.03,
				 translateXValue	= 20,
				 delayValue 		= 0.1,
				 easeType 			= "power2.out",
				 animatedTextElements = document.querySelectorAll('.text-anime-style-2');
			
			animatedTextElements.forEach((element) => {
				let animationSplitText = new SplitText(element, { type: "chars, words" });
					gsap.from(animationSplitText.chars, {
						duration: 1,
						delay: delayValue,
						x: translateXValue,
						autoAlpha: 0,
						stagger: staggerAmount,
						ease: easeType,
						scrollTrigger: { trigger: element, start: "top 85%"},
					});
			});		
		}
		
		if ($('.text-anime-style-3').length) {		
			let	animatedTextElements = document.querySelectorAll('.text-anime-style-3');
			
			 animatedTextElements.forEach((element) => {
				//Reset if needed
				if (element.animation) {
					element.animation.progress(1).kill();
					element.split.revert();
				}

				element.split = new SplitText(element, {
					type: "lines,words,chars",
					linesClass: "split-line",
				});
				gsap.set(element, { perspective: 400 });

				gsap.set(element.split.chars, {
					opacity: 0,
					x: "50",
				});

				element.animation = gsap.to(element.split.chars, {
					scrollTrigger: { trigger: element,	start: "top 90%" },
					x: "0",
					y: "0",
					rotateX: "0",
					opacity: 1,
					duration: 1,
					ease: Back.easeOut,
					stagger: 0.02,
				});
			});		
		}
	}
	
	if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            initHeadingAnimation();
        });
    } else {
        window.addEventListener("load", initHeadingAnimation);
    }

	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if($parallaxie.length && ($window.width() > 1024))
	{
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({focus: false}).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm(){
		/* Ajax call to submit form */
		$.ajax({
			type: "POST",
			url: "form-process.php",
			data: $contactform.serialize(),
			success : function(text){
				if (text === "success"){
					formSuccess();
				} else {
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h4 text-success";
		} else {
			var msgClasses = "h4 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */

	/* Animated Wow Js */	
	new WOW().init();

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	}

	if ($('.popup-video-inline').length) {
		$('.popup-video-inline').magnificPopup({
			type: 'inline',
			mainClass: 'mfp-fade mfp-video-popup',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true,
			callbacks: {
				open: function() {
					var video = document.getElementById('heroVideoPlayer');
					if (video) {
						video.currentTime = 0;
						video.play().catch(function(){});
					}
				},
				close: function() {
					var video = document.getElementById('heroVideoPlayer');
					if (video) {
						video.pause();
					}
				}
			}
		});
	}

	/* product quantity Input Js */
	document.querySelectorAll(".qty-box").forEach(box => {
		const input = box.querySelector(".qty-input");

		box.querySelector(".plus").onclick = () =>
		input.value = String(+input.value + 1).padStart(2, "0");

		box.querySelector(".minus").onclick = () =>
		input.value = String(Math.max(1, +input.value - 1)).padStart(2, "0");
	});

	/* Gear Finder Dependent Dropdowns */
	var $gearCategory = $('#gearCategory');
	var $gearType = $('#gearType');
	if ($gearCategory.length && $gearType.length) {
		var gearOptionsByCategory = {
			'mens-gear': [
				{ value: 'leather-jackets', text: "Men's Leather Jackets" },
				{ value: 'leather-vests', text: "Men's Leather Vests & Cuts" },
				{ value: 'textile-jackets', text: "Men's Textile Jackets" },
				{ value: 'chaps-pants', text: "Men's Chaps & Leather Pants" },
				{ value: 'shirts-hoodies', text: "Men's T-Shirts & Hoodies" },
				{ value: 'long-sleeves', text: "Men's Long Sleeves" },
				{ value: 'rain-gear', text: "Men's Rain Gear" }
			],
			'womens-gear': [
				{ value: 'leather-jackets', text: "Women's Leather Jackets" },
				{ value: 'leather-vests', text: "Women's Leather Vests" },
				{ value: 'textile-jackets', text: "Women's Textile Jackets" },
				{ value: 'chaps-pants', text: "Women's Chaps & Pants" },
				{ value: 'shirts-hoodies', text: "Women's Tee Shirts" },
				{ value: 'long-sleeves', text: "Women's Long Sleeves" },
				{ value: 'handbags', text: "Biker Handbags & CCW Bags" }
			],
			'biker-accessories': [
				{ value: 'headgear-bandanas', text: "Head Gear, Caps & Bandanas" },
				{ value: 'eyewear-goggles', text: "Sunglasses & Riding Goggles" },
				{ value: 'biker-jewelry', text: "Biker Rings & Jewelry" },
				{ value: 'biker-bells', text: "Guardian & Biker Bells" },
				{ value: 'belts-buckles', text: "Cactus Belts & Buckles" },
				{ value: 'wallets-chains', text: "Leather Wallets & Chains" },
				{ value: 'patches-pins', text: "Biker Patches & Pins" },
				{ value: 'whips-selfdefense', text: "Get-Back Whips & Protection" }
			],
			'leather-apparel': [
				{ value: 'leather-jackets', text: "Premium Leather Jackets" },
				{ value: 'leather-vests', text: "Leather Vests & Concealed Carry" },
				{ value: 'chaps-pants', text: "Naked Cowhide Chaps" },
				{ value: 'gloves', text: "Leather Riding Gloves" },
				{ value: 'belts', text: "Heavy Duty Leather Belts" }
			],
			'helmets-eyewear': [
				{ value: 'dot-helmets', text: "DOT Motorcycle Helmets" },
				{ value: 'sunglasses', text: "Riding Sunglasses" },
				{ value: 'goggles', text: "Windproof Riding Goggles" },
				{ value: 'facemasks', text: "Face Masks & Tubes" }
			],
			'pre-loved': [
				{ value: 'vintage-jackets', text: "Pre-Loved Leather Jackets" },
				{ value: 'vintage-vests', text: "Pre-Loved Vests" },
				{ value: 'vintage-chaps', text: "Pre-Loved Chaps" },
				{ value: 'collectibles', text: "Rare Biker Collectibles" }
			],
			'route-66': [
				{ value: 'route66-apparel', text: "Route 66 Kingman Shirts" },
				{ value: 'route66-hoodies', text: "Route 66 Hoodies & Hats" },
				{ value: 'route66-signs', text: "Historic Signs & Decor" },
				{ value: 'route66-stickers', text: "Route 66 Stickers & Pins" }
			],
			'services': [
				{ value: 'leather-restoration', text: "Leather Cleaning & Restoration" },
				{ value: 'leather-repair', text: "Leather Jacket & Vest Repair" },
				{ value: 'patch-sewing', text: "Custom Patch Sewing" },
				{ value: 'ccw-pocket', text: "Concealed Carry Pocket Install" },
				{ value: 'strap-repair', text: "Nylon Strap Repair" }
			]
		};

		var defaultOptions = $gearType.html();

		$gearCategory.on('change', function() {
			var cat = $(this).val();
			if (cat && gearOptionsByCategory[cat]) {
				var opts = '<option value="" disabled selected>Select Gear Type</option>';
				gearOptionsByCategory[cat].forEach(function(item) {
					opts += '<option value="' + item.value + '">' + item.text + '</option>';
				});
				$gearType.html(opts);
			} else {
				$gearType.html(defaultOptions);
			}
		});
	}

	/* Featured Products Auto Carousel JS */
	if ($('.featured-product-slider').length) {
		var featuredProductSwiper = new Swiper('.featured-product-slider', {
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			speed: 800,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
			navigation: {
				nextEl: '.featured-slider-next',
				prevEl: '.featured-slider-prev'
			},
			pagination: {
				el: '.featured-product-pagination',
				clickable: true
			},
			breakpoints: {
				576: {
					slidesPerView: 2,
					spaceBetween: 15
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20
				},
				1200: {
					slidesPerView: 4,
					spaceBetween: 20
				}
			},
			observer: true,
			observeParents: true
		});
	}

})(jQuery);