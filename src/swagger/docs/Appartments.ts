/**
 * @swagger
 * tags:
 *   - name: Apartments
 *     description: Endpoints related to apartments management
 */

/**
 * @swagger
 * /apartments/{id}:
 *   delete:
 *     summary: Delete an apartment
 *     description: Delete an apartment by its ID.
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The apartment ID
 *     responses:
 *       204:
 *         description: Apartment deleted successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /apartments/{id}:
 *   get:
 *     summary: Retrieve a single apartment
 *     description: Retrieve a single apartment by its ID, associated with the authenticated user's account.
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the apartment to retrieve
 *     responses:
 *       200:
 *         description: An apartment object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The apartment ID
 *                 number:
 *                   type: string
 *                   description: The apartment number
 *                 Building:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The building ID
 *                     name:
 *                       type: string
 *                       description: The building name
 *                 Contracts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The contract ID
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         description: The start date of the contract
 *                       endDate:
 *                         type: string
 *                         format: date
 *                         description: The end date of the contract
 *                       Renter:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The renter ID
 *                           name:
 *                             type: string
 *                             description: The renter name
 *       404:
 *         description: Apartment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /apartments/{id}:
 *   put:
 *     summary: Update an existing apartment
 *     description: Update the details of an existing apartment by its ID.
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The apartment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 description: The apartment number
 *               rented:
 *                 type: boolean
 *                 description: Whether the apartment is rented
 *               active_renter_id:
 *                 type: string
 *                 description: The ID of the active renter
 *               active_contract_id:
 *                 type: string
 *                 description: The ID of the active contract
 *               it_was_sold:
 *                 type: boolean
 *                 description: Whether the apartment was sold
 *               type:
 *                 type: string
 *                 description: The type of the apartment
 *     responses:
 *       200:
 *         description: The updated apartment object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The apartment ID
 *                 number:
 *                   type: string
 *                   description: The apartment number
 *                 rented:
 *                   type: boolean
 *                   description: Whether the apartment is rented
 *                 active_renter_id:
 *                   type: string
 *                   description: The ID of the active renter
 *                 active_contract_id:
 *                   type: string
 *                   description: The ID of the active contract
 *                 it_was_sold:
 *                   type: boolean
 *                   description: Whether the apartment was sold
 *                 type:
 *                   type: string
 *                   description: The type of the apartment
 *       404:
 *         description: Apartment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /apartments:
 *   get:
 *     summary: Retrieve a list of apartments
 *     description: Retrieve a list of apartments associated with the authenticated user's account, optionally filtered by building ID.
 *     tags: [Apartments]
 *     parameters:
 *       - in: query
 *         name: buildingId
 *         schema:
 *           type: integer
 *         description: The ID of the building to filter apartments by
 *     responses:
 *       200:
 *         description: A list of apartments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The apartment ID
 *                   number:
 *                     type: string
 *                     description: The apartment number
 *                   Building:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The building ID
 *                       name:
 *                         type: string
 *                         description: The building name
 *                   Contracts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The contract ID
 *                         startDate:
 *                           type: string
 *                           format: date
 *                           description: The start date of the contract
 *                         endDate:
 *                           type: string
 *                           format: date
 *                           description: The end date of the contract
 *                         Renter:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: The renter ID
 *                             name:
 *                               type: string
 *                               description: The renter name
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /apartments:
 *   post:
 *     summary: Create a new apartment
 *     description: Create a new apartment associated with the authenticated user's account.
 *     tags: [Apartments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 description: The apartment number
 *               rented:
 *                 type: boolean
 *                 description: Whether the apartment is rented
 *               type:
 *                 type: string
 *                 description: The type of the apartment
 *     responses:
 *       200:
 *         description: The created apartment object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The apartment ID
 *                 number:
 *                   type: string
 *                   description: The apartment number
 *                 rented:
 *                   type: boolean
 *                   description: Whether the apartment is rented
 *                 account_id:
 *                   type: integer
 *                   description: The account ID associated with the apartment
 *                 type:
 *                   type: string
 *                   description: The type of the apartment
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
