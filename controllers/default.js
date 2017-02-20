var Product = GETSCHEMA('Product');
var fs = require('fs');

exports.install = function () {
    F.route('/');
    F.route('/products', view_products_list);
    F.route('/admin', view_admin);
    F.route('/products/{product_id}', view_product);
    F.route('/products/create', view_product_add);
    F.route('/products/create_new', product_create, ['upload']);
    F.route('/products/update/{product_id}', view_product_update);
    F.route('/products/update/', product_update, ['post']);
    F.route('/products/delete/{product_id}', product_delete, ['post']);
    F.route('/test', test, ['upload'], {
        flags: ['upload'],
        length: 25 * 1024 * 1024,
        timeout: 30 * 60 * 1000
    });
};

function view_products_list() {
	var self = this;
    self.view('/temp/products_list', {
        products : Product.list
    });
}

function view_product(product_id) {
    var product = Product.by_id[product_id];
    var self = this;
    self.view('/temp/product', {
        product: product
    });
}

function view_product_add() {
    var self = this;
    self.view('/temp/product_add');
}

function product_create() {
    var self = this;
    Product.create_new(this.body, function (result) {
        self.json(SUCCESS(result));
    });
    console.log("from server product");
    console.log(this.body);
}

function view_product_update(product_id) {
    var product = Product.by_id[product_id];
    var self = this;
    self.view('/temp/product_edit', {
        product: product
    });
}

function product_update() {
    var self = this;
    Product.update(this.body, function (result) {
        self.json(SUCCESS(result));
    });
}

function product_delete(product_id) {
    var self = this;
    Product.delete_p(product_id, function (result) {
        self.json(SUCCESS(result));
    });
}

function view_admin() {
    var self = this;
    self.view('/admin/admin', {
        products: Product.list
    });
}







function test() {
    var self = this;

    fs.readFile(file.path, (err, data) => {
        if (err) throw err;

        fs.writeFile(__dirname + '/../public/tmp/my-new-file.jpg', data, (err) => {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    });

    self.view('/test');
}