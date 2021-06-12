Views se pouziva pro HBS dynamicke HTML.
Jde se z neho relativne odkazovat jako z /public.
Pro odeslani ze serveru se pouzije res.render('file').
V {{foo}} jde pristupovat k promennym predanym v render volani.
V {{>foo}} lze pristupovat k partials.