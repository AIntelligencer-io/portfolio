/*
  Portfolyo içeriği
  ------------------
  Sitedeki kişisel bilgiler ve projelerin tamamı bu dosyada.

  Her proje:
    id        adres (ör. #wanetime) ve kimlik
    category  hangi kategoride listeleneceği (aşağıdaki categories id'leri)
    year      listede kategorinin yanında görünen yıl
    title     proje adı
    image     kapak: listedeki önizleme ve detay sayfasının en üstündeki görsel
    focus     kapakta ürünün dikey konumu (0 = en üst, 100 = en alt); kırpılan alanlarda ürün bu noktaya göre ortalanır
    summary   listede proje adının yanındaki kısa açıklama (boş bırakılabilir)
    intro     detay sayfasında başlığın altındaki yazı
    gallery   detay sayfasındaki diğer görseller, sırasıyla; her biri bir bölüm olur.
              w ve h görselin piksel ölçüsüdür, düzeni belirler:
                yatay (16:9, 16:10, A-serisi yatay) → görsel içerik genişliğinde, açıklama altında
                dikey                               → açıklama solda, görsel sağda
                çok uzun (vaka sayfası)             → görsel tam boyunda; hızlı yüklensin diye dilimlenir:
                                                      { w, h, parts: [{ src, w, h }, ...] }
    sections  gallery'deki görsellerin açıklamaları, aynı sırayla: { label, title, text: ["paragraf", ...] }
              metni olmayan görsel için {} yazılır.
    noText    true ise detay sayfasında hiç açıklama gösterilmez (yalnızca görseller)
    layout    "reel" ise detay sayfası dikey, sonsuz kayan görsel akışı olarak açılır (reelGroups ile)
*/
window.PORTFOLIO = {
  person: {
    name: "Necati Yücekul",
    email: "necatiyucekul@gmail.com",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/necatiyucekul/" }
    ]
  },

  categories: [
    { id: "endustriyel", label: "Ürün Tasarımı" },
    { id: "grafik", label: "Grafik Tasarım" },
    { id: "uiux", label: "UI/UX Tasarım" }
  ],
  projects: [
    {
      id: "wanetime", category: "endustriyel", year: 2026,
      title: "Wanetime",
      image: "media/projeler/wanetime/1.jpg", focus: 40,
      summary: "",
      intro: "Taşın Kalıcılığı, Zamanın Akışı.",
      gallery: [{ src: "media/projeler/wanetime/2.jpg", w: 2526, h: 1785 }, { src: "media/projeler/wanetime/3.jpg", w: 2526, h: 1785 }, { src: "media/projeler/wanetime/4.jpg", w: 2526, h: 1785 }, { src: "media/projeler/wanetime/5.jpg", w: 2526, h: 1785 }],
      sections: [
        { label: "Brief", text: ["Doğal taşın ham potansiyelini ve atık malzemeleri değerlendirerek; estetik, işlevsel ve katma değeri yüksek bir yaşam alanı ürünü tasarlamak."] },
        { label: "Ürün açıklaması", text: ["Zaman, hayatımızın en değerli ve sınırlı kaynağıdır. Wanetime, zamanı yalnızca ölçülen bir birim değil, yaşanan bir döngü olarak ele alır. Altın oranlı spiral form, traverten taşın kalıcılığıyla zamanın akışkanlığı arasında bir denge kurar. Kullanıcıya zamanın geçişini değil, anın değerini ve hedeflere giden süreçte verimliliği hatırlatır."] }
      ]
    },
    {
      id: "organice", category: "endustriyel", year: 2025,
      title: "Organice",
      image: "media/projeler/organice/1.jpg", focus: 72,
      summary: "",
      intro: "Kitapların kütüphane içindeki yolculuğunu güvenli, düzenli ve kullanıcı dostu bir deneyime dönüştüren fonksiyonel taşıma çözümü",
      gallery: [{ src: "media/projeler/organice/2.jpg", w: 2526, h: 1785 }, { src: "media/projeler/organice/3.jpg", w: 2526, h: 1785 }, { src: "media/projeler/organice/4.jpg", w: 2526, h: 1785 }, { src: "media/projeler/organice/5.jpg", w: 2526, h: 1785 }],
      sections: [
        { label: "Brief", text: ["Bu proje kütüphane kullanıcılarının ve çalışanlarının kitap taşıma sürecinde yaşadığı temel ihtiyaçlara yanıt veren yenilikçi bir kitap arabası tasarımını kapsamaktadır. Kullanım kolaylığı, dengeli yük dağılımı, ergonomi ve hareket kabiliyeti gibi temel kriterler doğrultusunda geliştirilen bu tasarım, hem işlevsel hem de estetik bir çözüm sunmayı amaçlamaktadır."] },
        {},
        { title: "Dinamik Bölücü Sistem", text: ["Değişen doluluk oranlarına göre ayarlanabilen hareketli bölücüler sayesinde kitaplar güvenli bir şekilde organize edilir."] }
      ]
    },
    {
      id: "trail-series", category: "endustriyel", year: 2025,
      title: "Trail Series",
      image: "media/projeler/trail-series/1.jpg", focus: 55,
      summary: "",
      intro: "Dayanıklılık, performans ve ikonik tasarım dilinin üç farklı mutfak aletine entegrasyonu.",
      gallery: [{ src: "media/projeler/trail-series/2.jpg", w: 2526, h: 1785 }, { src: "media/projeler/trail-series/3.jpg", w: 2526, h: 1785 }, { src: "media/projeler/trail-series/4.jpg", w: 2526, h: 1785 }, { src: "media/projeler/trail-series/5.jpg", w: 2526, h: 1785 }, { src: "media/projeler/trail-series/6.jpg", w: 2526, h: 1785 }, { src: "media/projeler/trail-series/7.jpg", w: 2526, h: 1785 }, { src: "media/projeler/trail-series/8.jpg", w: 2526, h: 1785 }],
      sections: [
        { label: "Brief", text: ["Bu konsept projenin temel amacı, tüketici satın alma kararlarında güçlü bir etken olan \"ürün ailesi tutarlılığı\" ve \"marka kimliği\" ilişkisini incelemektir. Bu doğrultuda, mevcutta bu sektörde yer almayan ikonik bir markanın tasarım dili analiz edilmiş; elde edilen görsel ve niteliksel veriler, mutfak/atölye kullanımına yönelik üç farklı elektrikli ürün ailesine uyarlanmıştır."] },
        {},
        { text: ["Stanley’in ikonik dayanıklılığı, filtre kahve deneyimiyle yeniden yorumlandı. Kamp kültüründen ilham alan paslanmaz çelik gövdesi ve zamansız form dili, optimize edilmiş demleme sistemiyle birleşerek her fincanda tutarlı bir kahve sunar ve outdoor ruhunu mutfaklara taşır."] }
      ]
    },
    {
      id: "harwaste", category: "endustriyel", year: 2024,
      title: "Harwaste",
      image: "media/projeler/harwaste/1.jpg", focus: 52,
      summary: "",
      intro: "Harwaste, büyük çöp kamyonlarının giremediği tarihi çarşılarda ve trafiğe kapalı caddelerde çalışan temizlik personeli için tasarlandı. Kompakt ve elektrikli gövde, dar sokaklarda sessiz ve emisyonsuz çalışacak şekilde kurgulandı. Araç, personelin topladığı atığı taşıyan ve toplama anında ayrıştıran bir yardımcı olarak konumlandırıldı.",
      gallery: [{ src: "media/projeler/harwaste/2.jpg", w: 2413, h: 1347 }, { src: "media/projeler/harwaste/3.jpg", w: 2526, h: 1028 }, { src: "media/projeler/harwaste/4.jpg", w: 2520, h: 1530 }, { src: "media/projeler/harwaste/5.jpg", w: 2520, h: 1530 }, { src: "media/projeler/harwaste/6.jpg", w: 2520, h: 1530 }],
      sections: [
        { text: ["Yayalarla aynı alanı paylaşan araçta keskin hatlar yerine yumuşak geçişli yüzeyler tercih edildi. Geniş cam yüzeyler gövdenin hacmini dengeler ve ağır vasıta algısını azaltır. 4 metre uzunluk ve 2 metre yükseklikteki kompakt ölçüler, dar sokaklarda manevra kabiliyetini artırır.", "Çocuklarda yaklaşan bir aracın hızını ve yönünü doğru değerlendirecek bilişsel gelişim henüz tamamlanmamıştır. Bu nedenle güvenlik sorumluluğu yayaya değil, araca verildi. Tepe uyarı ışığı ve LED ön farlar, aracın varlığını ve hareket yönünü çevresine sözsüz bir dille iletir."] },
        { text: ["Hazneler raylı bir kızak sistemi üzerinde teleskopik olarak iç içe geçer. Karton haznesi dolduğunda sıkıştırma, aracın kendi motor gücüyle yapılır. Böylece kompakt gövdede taşıma hacmi artırılır. Boşaltma, haznenin kaldırılıp arkaya devrilmesiyle gerçekleştirilir."] },
        { text: ["Harwaste, standart atık toplama araçlarının erişemediği tarihi çarşılar ve trafiğe kapalı yaya bölgeleri için geliştirilmiş bir hizmet aracıdır. Temizlik personelini desteklemek amacıyla tasarlandı. Dükkan önlerinden toplanan karton ve karışık atık, üst kısımdaki iki ayrı hazneye yüklenir. Böylece atık, toplama anında kaynağında ayrıştırılır."] },
        { text: ["Yaya kazalarının önemli bir bölümü kör noktalarda ve geri manevralar sırasında meydana gelir. Bu riski azaltmak için konvansiyonel temizlik araçlarındaki yüksek kabin yerine alçak bir sürüş pozisyonu benimsendi. Ön ve yan yüzeyleri saran panoramik cam, sürücüye aracın çevresinde geniş bir görüş alanı sağlar."] },
        { text: ["Elektrikli tahrik sistemi, yaya bölgelerinde emisyonsuz ve düşük gürültüyle çalışmayı mümkün kılar. Böylece temizlik, çarşının ve caddenin gündelik akışı kesintiye uğramadan sürdürülür."] }
      ]
    },
    {
      id: "sosyal-medya", category: "grafik", year: 2026,
      title: "Sosyal Medya Tasarımları",
      summary: "",
      image: "media/projeler/sosyal-medya/post/1.jpg", focus: 50,
      /* layout "reel": detay sayfası dikey, sonsuz kayan görsel akışı olarak açılır.
         reelGroups: sayfadaki alt kategoriler (sekmeler). Her gruba görselleri sırayla ekle: { src, w, h }
         video için: { src: "...mp4", type: "video", w: 1080, h: 1920 }. */
      layout: "reel",
      reelGroups: [
        { label: "Post", items: [
          { src: "media/projeler/sosyal-medya/post/1.jpg", w: 1600, h: 1600 },
          { src: "media/projeler/sosyal-medya/post/2.jpg", w: 1600, h: 1600 },
          { src: "media/projeler/sosyal-medya/post/3.jpg", w: 1600, h: 1600 },
          { src: "media/projeler/sosyal-medya/post/4.jpg", w: 1600, h: 1600 },
          { src: "media/projeler/sosyal-medya/post/5.jpg", w: 1600, h: 1600 },
          { src: "media/projeler/sosyal-medya/post/6.jpg", w: 1600, h: 1600 },
          { src: "media/projeler/sosyal-medya/post/7.mp4", w: 1080, h: 1080, type: "video", poster: "media/projeler/sosyal-medya/post/7-poster.jpg" },
          { src: "media/projeler/sosyal-medya/post/8.jpg", w: 1600, h: 1600 },
          { src: "media/projeler/sosyal-medya/post/9.jpg", w: 1600, h: 1600 },
          { src: "media/projeler/sosyal-medya/post/10.jpg", w: 1600, h: 1600 },
          { src: "media/projeler/sosyal-medya/post/11.jpg", w: 1000, h: 1000 }
        ] },
        { label: "Story", items: [
          { src: "media/projeler/sosyal-medya/story/1.jpg", w: 1080, h: 1920 },
          { src: "media/projeler/sosyal-medya/story/2.jpg", w: 1080, h: 1920 },
          { src: "media/projeler/sosyal-medya/story/3.jpg", w: 1080, h: 1920 },
          { src: "media/projeler/sosyal-medya/story/4.jpg", w: 1080, h: 1920 },
          { src: "media/projeler/sosyal-medya/story/5.jpg", w: 1080, h: 1920 }
        ] }
      ]
    },
    {
      id: "obilet", category: "uiux", year: 2026, featured: true, short: "Obilet",
      title: "Obilet Ana Sayfa Ekranı",
      image: "media/projeler/obilet/1.jpg", focus: 50,
      summary: "",
      gallery: [{ src: "media/projeler/obilet/2.jpg", w: 2560, h: 1440 }, { src: "media/projeler/obilet/3.jpg", w: 1224, h: 1620 }, { src: "media/projeler/obilet/4.jpg", w: 1224, h: 1620 }],
      sections: [
        {},
        { text: ["Otobüs, uçak ve araç kiralama gibi ana hizmet sekmelerinin boyutları arttırılarak erişilebilirliği kolaylaştırıldı.", "Kalkış ve varış noktası seçim alanları, kullanıcının odaklanmasını kolaylaştıracak hiyerarşik bir düzene sokuldu. Input alanlarının boyutları büyütülerek veri giriş hızı artırıldı ve hata payı en aza indirildi."] },
        { text: ["Uygulamanın genelindeki yoğun kırmızı arka plan, yerini beyaz ve nötr tonlara bıraktı. Markanın ana rengi sadece kullanıcıyı yönlendirmek istenen eylem alanlarında vurgulandı.", "Otobüs seferlerinin listelendiği kart arayüzlerinde minimalist bir yaklaşıma gidildi. Saat, fiyat ve firma gibi kullanıcının karar verme sürecini doğrudan etkileyen kritik bilgilere odaklanıldı. İşlevsellik ve okunabilirlik ön planda tutuldu."] }
      ]
    },
    {
      id: "gib", category: "uiux", year: 2025,
      title: "GiB Ödeme Ekranı",
      image: "media/projeler/gib/1.jpg", focus: 65,
      summary: "",
      gallery: [{ src: "media/projeler/gib/2.jpg", w: 2560, h: 1440 }, { src: "media/projeler/gib/3.jpg", w: 2560, h: 1440 }, { src: "media/projeler/gib/4.jpg", w: 2560, h: 1440 }, { src: "media/projeler/gib/5.jpg", w: 2560, h: 1440 }, { src: "media/projeler/gib/6.jpg", w: 2560, h: 1440 }],
      sections: [
        {},
        { text: ["Ödeme yöntemleri bölümünü kullanıcı deneyimini iyileştirecek şekilde sadeleştirdim."] },
        { text: ["GİB logosu ve kart görseli gibi kullanıcıyı yorabilecek gereksiz öğeleri kaldırarak, başlık metninin konumunu yeniden düzenledim ve daha sade bir görünüm elde ettim."] },
        { text: ["Kullanıcının ödeme yapacağı konu hakkında detaylı bilgilere ulaşabileceği ödeme detayının bulunduğu bir alan ekledim."] },
        { text: ["Input alanlarına, kullanıcıyı yönlendiren açıklayıcı placeholder metinleri ve hata durumlarına göre validasyon mesajları ekledim. Böylece kullanıcılar, doğrulama ekranına geçmeden önce girdikleri bilgilerin doğruluğunu anlık olarak kontrol edebilir ve gerektiğinde düzeltebilir.", "Tasarım sürecinde, GİB ödeme ekranının mevcut renk paleti ve görsel kimliğine bağlı kalarak tutarlı bir arayüz oluşturmaya çalıştım."] }
      ]
    }
,
    {
      id: "getfit", category: "uiux", year: 2026,
      title: "GetFit Örnek Vaka Çalışması",
      noText: true,
      image: "media/projeler/getfit/1.jpg", focus: 50,
      summary: "",
      gallery: [{ w: 2000, h: 23281, parts: [
        { src: "media/projeler/getfit/2-01.jpg", w: 2000, h: 2500 },
        { src: "media/projeler/getfit/2-02.jpg", w: 2000, h: 2500 },
        { src: "media/projeler/getfit/2-03.jpg", w: 2000, h: 2500 },
        { src: "media/projeler/getfit/2-04.jpg", w: 2000, h: 2500 },
        { src: "media/projeler/getfit/2-05.jpg", w: 2000, h: 2500 },
        { src: "media/projeler/getfit/2-06.jpg", w: 2000, h: 2500 },
        { src: "media/projeler/getfit/2-07.jpg", w: 2000, h: 2500 },
        { src: "media/projeler/getfit/2-08.jpg", w: 2000, h: 2500 },
        { src: "media/projeler/getfit/2-09.jpg", w: 2000, h: 2500 },
        { src: "media/projeler/getfit/2-10.jpg", w: 2000, h: 781 }
      ] }]
    },
    {
      id: "audioverse", category: "uiux", year: 2025,
      title: "Audioverse Giriş Ekranı",
      image: "media/projeler/audioverse/1.jpg", focus: 50,
      summary: "",
      gallery: [{ src: "media/projeler/audioverse/2.jpg", w: 2560, h: 1440 }, { src: "media/projeler/audioverse/3.jpg", w: 2560, h: 1440 }],
      sections: [
        { text: ["Kullanıcıların bir müzik uygulamasına hızlı ve kolay bir şekilde kayıt olmalarını sağlamak amacıyla \"Kayıt Ol\" ve \"Giriş Yap\" ekranları, modern bir arayüzle hazırlanmıştır. Kullanıcıların sosyal medya hesapları ile kolayca kayıt olabilmeleri için entegrasyon seçenekleri sunulmuştur. Tasarımda sade bir düzen, net bir bilgi hiyerarşisi ve minimal görsel ögeler kullanılmıştır."] }
      ]
    }
  ]
};