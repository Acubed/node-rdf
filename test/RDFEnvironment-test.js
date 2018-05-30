var assert = require('assert');
var rdf = require('..');

describe('rdf.environment.resolve', function(){
	it('builtin prefixes', function(){
		var env = new rdf.RDFEnvironment;
		assert.strictEqual(env.resolve("rdf:type"), "http://www.w3.org/1999/02/22-rdf-syntax-ns#type");
		assert.strictEqual(env.resolve("rdfs:Class"), "http://www.w3.org/2000/01/rdf-schema#Class");
		assert.strictEqual(env.resolve("unknownprefix2:foo"), null);
	});
	it('define prefix', function(){
		var env = new rdf.RDFEnvironment;
		assert.strictEqual(env.resolve("unkfoo:foo"), null);
		env.setPrefix("unkfoo", "http://example.com/1/ex/42/");
		assert.strictEqual(env.resolve("unkfoo:foo"), "http://example.com/1/ex/42/foo");
	});
	it('define default prefix', function(){
		var env = new rdf.RDFEnvironment;
		assert.strictEqual(env.resolve(":bar"), null);
		env.setDefaultPrefix("http://example.com/2/ex/42/");
		assert.strictEqual(env.resolve(":answer"), "http://example.com/2/ex/42/answer");
	});
	it('createTriple(iri, iri, iri)', function(){
		var env = new rdf.RDFEnvironment;
		var t = env.createTriple(
			env.createNamedNode('http://example.com/foo'),
			env.createNamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
			env.createNamedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
		);
		assert.ok(t);
	});
	it('createTriple(bnode, iri, bnode)', function(){
		var env = new rdf.RDFEnvironment;
		var t = env.createTriple(
			env.createNamedNode('http://example.com/foo'),
			env.createNamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
			env.createNamedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
		);
		assert.ok(t);
	});
	it('createTriple(iri, iri, literal)', function(){
		var env = new rdf.RDFEnvironment;
		var t = env.createTriple(
			env.createNamedNode('http://example.com/foo'),
			env.createNamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
			env.createLiteral('string!'),
		);
		assert.ok(t);
	});
	it('createTriple: no literal subject', function(){
		var env = new rdf.RDFEnvironment;
		assert.throws(function(){
			env.createTriple(
				env.createLiteral('string!'),
				env.createNamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
				env.createNamedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
			);
		});
	});
	it('createTriple: no bnode predicate', function(){
		var env = new rdf.RDFEnvironment;
		assert.throws(function(){
			env.createTriple(
				env.createNamedNode('http://example.com/foo'),
				env.createBlankNode(),
				env.createNamedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
			);
		});
	});
	it('createTriple: no literal predicate', function(){
		var env = new rdf.RDFEnvironment;
		assert.throws(function(){
			env.createTriple(
				env.createNamedNode('http://example.com/foo'),
				env.createLiteral('string!'),
				env.createNamedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
			);
		});
	});
});
