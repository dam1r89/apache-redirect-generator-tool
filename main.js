var app = new Vue({
    el: '#rewrite',
    data: {
    	removeQuery: true,
        from: '',
        to: '',
        output: '',
    },
    computed: 	{
        result: function() {
            var from = document.createElement('a');
            from.href = this.from;

            var to = document.createElement('a');
            to.href = this.to;

            if (!from.search) {
                return `Redirect 301 ${from.pathname} ${to.pathname}`;
            }

            var queryConditions = from.search.replace(/^\?/, '').split('&').map(function(query) {
            	query = this.regExpEscape(query);
                return `RewriteCond %{QUERY_STRING} ${query}\n`;
            }.bind(this)).join('');

            var toQuery = to.search;

            if (this.removeQuery){
            	toQuery = '?';
            }

            fromRule = from.pathname.replace(/^\//, '');

            return `${queryConditions}RewriteRule ${fromRule} ${to.pathname}${toQuery} [L,R=301]`

        }
    },
    methods: {
        regExpEscape: function(s) {
            return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
        },
        save: function(){
        	this.output += this.result  + '\n\n';
        }
    }


})
