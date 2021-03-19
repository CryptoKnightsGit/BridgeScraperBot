"use strict";

/**************************
 * Import important stuff *
 **************************/

// Nothing

/*****************************
 * The ScrapperSettings class *
 *****************************/

/**
 * Settings for the Scrapper bot
 */
class ScrapperSettings {
	/**
	 * Creates a new ScrapperSettings object
	 *
	 * @param {Object} settings	The raw settings object to use
	 * @param {String} settings.url	URL for the RSS Feed
	 * @param {String} settings.userAgent UserAgent to be used when visiting the RSS Feed
	 * @param {Integer} settings.loop Search every x minutes for new updated
	 * @param {Object} settings.chatID Object for the chat ids for Telegram and Discord
	 * @param {String} settings.chatID.telegram Array for the list of Telegram chats to send the update to
	 * @param {String} settings.chatID.discord Array for the list of Discord chats to send the update to
	 * @param {String} settings.startLastBuildDate Search starting from this lastBuildDate
	 * @throws {Error}	If the settings object does not validate
	 */
	constructor(settings) {
		// Make sure the settings are valid
		ScrapperSettings.validate(settings);

		/**
		 * URL for the RSS Feed
		 *
		 * @type {String}
		 */
		this.url = settings.url;

		/**
		 * UserAgent to be used when visiting the RSS Feed
		 *
		 * @type {String}
		 */
		this.userAgent = settings.userAgent;

		/**
		 * Search every x minutes for new updated
		 * 
		 * @type {Integer}
		 */
		this.loop = settings.loop;

		/**
		 * Object for the chat ids for Telegram and Discord
		 *
		 * @type {Object}
		 */
		this.chatID = settings.chatID;

		/**
		 * Array for the list of Telegram chats to send the update to
		 *
		 * @type {Array}
		 */
		this.chatID.telegram = settings.chatID.telegram;

		/**
		 * Array for the list of Discord chats to send the update to
		 *
		 * @type {Array}
		 */
		this.chatID.discord = settings.chatID.discord;


		/**
		 * Search starting from this lastBuildDate
		 *
		 * @type {String}
		 */
		this.startLastBuildDate = settings.startLastBuildDate;
	}

	/**
	 * Makes a JSONifiable object of the settings. Called automatically by JSON.stringify
	 *
	 * @returns {Object}
	 */
	toJSON() {
		return Object.assign({}, this);;
	}

	/**
	 * Validates a raw settings object, checking if it is usable for creating a ScrapperSettings object
	 *
	 * @param {Object} settings	The object to validate
	 *
	 * @throws {Error}	If the object is not suitable. The error message says what the problem is
	 */
	static validate(settings) {
		// Check that the settings are indeed in object form
		if (!(settings instanceof Object)) {
			throw new Error("`settings` must be an object");
		}

		// Check that the url is a string
		if (typeof settings.url !== "string") {
			throw new Error("`settings.url` must be a string");
		}

		// Check that the useragent is a string
		if (typeof settings.userAgent !== "string") {
			throw new Error("`settings.userAgent` must be a string");
		}

		// Check that `loop` is an integer
		if (!Number.isInteger(settings.loop) || settings.loop <= 0) {
			throw new ("`settings.loop` must be an integer greater than 0");
		}

		// Check that the chatID is indeed in object form
		if (!(settings.chatID instanceof Object)) {
			throw new Error("`settings.chatID` must be an object");
		}
		
		// Check that the chatID.telegram is indeed in array form
		if (!(settings.chatID.telegram instanceof Array)) {
			throw new Error("`settings.chatID.telegram` must be an array");
		}

		// Check that the chatID.discord is indeed in array form
		if (!(settings.chatID.discord instanceof Array)) {
			throw new Error("`settings.chatID.discord` must be an array");
		}

		// Check that the startLastBuildDate is a string
		if (typeof settings.startLastBuildDate !== "string") {
			throw new Error("`settings.startLastBuildDate` must be a string");
		}

	}

	/**
	 * Default Scrapper settings
	 *
	 * @type {Object}
	 */
	static get DEFAULTS() {
		return {
			url: '',
			userAgent: '',
			chatID: {
				telegram: [],
				discord: []
			},
			loop: 1,
			startLastBuildDate: ''
		};
	}
}

/*************
 * Export it *
 *************/

module.exports = ScrapperSettings;
