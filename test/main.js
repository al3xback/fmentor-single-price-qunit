import jsdom from 'jsdom';
import axios from 'axios';

const { JSDOM } = jsdom;
const { test } = QUnit;

const url = 'https://al3xback.github.io/fmentor-single-price-qunit/';

const getData = () => {
	return axios
		.get(url)
		.then((res) => {
			const { document } = new JSDOM(res.data).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

QUnit.module('DOM', (hooks) => {
	hooks.beforeEach(async (assert) => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	test('should have three section elements', (assert) => {
		const sectionEls = document.querySelectorAll('section');

		assert.strictEqual(sectionEls.length, 3);
	});

	test("should have a first section element with a class of 'card__block--join-community'", (assert) => {
		const sectionEls = document.querySelectorAll('section');
		const firstSectionElClass = sectionEls[0].className;

		const isExpectedClassExist = firstSectionElClass
			.split(' ')
			.includes('card__block--join-community');

		assert.true(isExpectedClassExist);
	});

	test("should have a second section element with a class of 'card__block--monthly-subsription'", (assert) => {
		const sectionEls = document.querySelectorAll('section');
		const secondSectionElClass = sectionEls[1].className;

		const isExpectedClassExist = secondSectionElClass
			.split(' ')
			.includes('card__block--monthly-subsription');

		assert.true(isExpectedClassExist);
	});

	test("should have a third section element with a class of 'card__block--why-us'", (assert) => {
		const sectionEls = document.querySelectorAll('section');
		const thirdSectionEl = sectionEls[2].className;

		const isExpectedClassExist = thirdSectionEl
			.split(' ')
			.includes('card__block--why-us');

		assert.true(isExpectedClassExist);
	});
});
