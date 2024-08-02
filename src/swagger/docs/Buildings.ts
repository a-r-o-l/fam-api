/**
 * @swagger
 * tags:
 *   - name: Buildings
 *     description: Endpoints related to buildings management
 */

/**
 * @swagger
 * /buildings:
 *   get:
 *     summary: Retrieve a list of buildings
 *     description: Retrieve a list of buildings associated with the authenticated user's account, including apartments, contracts, and renters.
 *     tags: [Buildings]
 *     responses:
 *       200:
 *         description: A list of buildings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The building ID
 *                   name:
 *                     type: string
 *                     description: The building name
 *                   Apartments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The apartment ID
 *                         name:
 *                           type: string
 *                           description: The apartment name
 *                         Contracts:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 description: The contract ID
 *                               startDate:
 *                                 type: string
 *                                 format: date
 *                                 description: The start date of the contract
 *                               endDate:
 *                                 type: string
 *                                 format: date
 *                                 description: The end date of the contract
 *                               Renter:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: integer
 *                                     description: The renter ID
 *                                   name:
 *                                     type: string
 *                                     description: The renter name
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
 * /buildings/{id}:
 *   put:
 *     summary: Update an Building by ID
 *     tags: [Buildings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Building updated successfully
 */

/**
 * @swagger
 * /buildings:
 *   post:
 *     summary: Create a new building
 *     tags: [Buildings]
 *     responses:
 *       200:
 *         description: building created successfully
 */

/**
 * @swagger
 * /buildings/{id}:
 *   delete:
 *     summary: Building an account by ID
 *     tags: [Buildings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Building deleted successfully
 */

/**
 * @swagger
 * /buildings/{id}:
 *   get:
 *     summary: Find a Building by id
 *     tags: [Buildings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Building found successfully
 */
