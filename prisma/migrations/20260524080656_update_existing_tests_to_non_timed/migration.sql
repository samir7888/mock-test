-- Update existing tests from TIMED to NON_TIMED
UPDATE "MockTest" SET "category" = 'NON_TIMED' WHERE "category" = 'TIMED';
